const pool = require('../config/db');
const axios = require('axios');

const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/facebook/callback";
let ACCESS_TOKEN = ""; // Store the access token
let PAGE_ID = ""; // Store the selected Facebook Page ID
let INSTA_ID = ""; // Store the Instagram Business Account ID
let PAGE_ACCESS_TOKEN = ""; // Store the Page Access Token

const exampleRoute = (req, res) => {
  res.send("Hello from Facebook API!");
};

const authFacebook = (req, res) => {
  console.log("auth/facebook is running");
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email,pages_show_list,public_profile`;
  res.redirect(url);
};

// Handle Facebook OAuth callback
const authFacebookCallback = async (req, res) => {
  console.log("callback is running");
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
      params: {
        client_id: APP_ID,
        client_secret: APP_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code
      }
    });

    const { access_token } = data;
    // console.log('Access Token:', access_token);

    ACCESS_TOKEN = access_token; // Store the new access token globally
    console.log("Updated Access Token:", ACCESS_TOKEN);

    res.redirect("http://localhost:5173/facebook");

  } catch (error) {
    console.error("Error getting access token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
};

//get facebook pages
const getFacebookPages = async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.status(400).json({ error: "Missing User Access Token" });
    }

    const response = await axios.get(`https://graph.facebook.com/v21.0/me/accounts`, {
      params: { access_token: ACCESS_TOKEN },
    });

    const accounts = response.data.data.map(account => ({
      id: account.id,
      name: account.name,
    }));

    res.json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};

//post selected page id
const saveFacebookPageId = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("req.user from facebookController:", req.user);

    // ✅ Ensure req.user exists
    if (!req.user || !req.user.id || !req.user.name) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const { selectedAccount } = req.body;
    const client_id = req.user.id; // Extract client_id
    const username = req.user.name; // Extract username
    console.log(`client_id: ${client_id}, username: ${username}, selectedAccount: ${selectedAccount}`);

    if (!selectedAccount) {
      return res.status(400).json({ error: "No Facebook Page ID selected" });
    }

    const insertQuery = `
      INSERT INTO client_details (client_id, username, facebook_page_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (client_id) 
      DO UPDATE SET 
          facebook_page_id = EXCLUDED.facebook_page_id
      RETURNING *;
    `;

    const { rowCount, rows } = await pool.query(insertQuery, [client_id, username, selectedAccount]);

    if (rowCount === 0) {
      return res.status(500).json({ error: "Failed to insert data" });
    }

    res.json({ message: "Facebook Page ID saved successfully", data: rows[0] });
  } catch (error) {
    console.error("Error saving Facebook Page ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInstagramAccount = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const client_id = req.user.id; // Get client ID from authenticated user

    // Fetch PAGE_ID from the database
    const pageQuery = `SELECT facebook_page_id FROM client_details WHERE client_id = $1`;
    const pageResult = await pool.query(pageQuery, [client_id]);

    if (pageResult.rows.length === 0 || !pageResult.rows[0].facebook_page_id) {
      return res.status(404).json({ error: "Facebook Page ID not found for the user" });
    }

    PAGE_ID = pageResult.rows[0].facebook_page_id;

    // Check if access token is available
    if (!ACCESS_TOKEN) {
      return res.status(400).json({ error: "Missing User Access Token" });
    }

    // Step 1: Get Instagram Business Account ID
    const pageResponse = await axios.get(
      `https://graph.facebook.com/v21.0/${PAGE_ID}?fields=instagram_business_account`,
      { params: { access_token: ACCESS_TOKEN } }
    );

    INSTA_ID = pageResponse.data.instagram_business_account?.id;

    if (!INSTA_ID) {
      return res.status(404).json({ error: "No Instagram Business Account linked." });
    }

    // Step 2: Get Instagram Account Name and Username
    const instaResponse = await axios.get(
      `https://graph.facebook.com/v21.0/${INSTA_ID}?fields=id,name,username&access_token=${ACCESS_TOKEN}`
    );

    return res.json({
      instagram_id: instaResponse.data.id,
      instagram_username: instaResponse.data.username,
    });

  } catch (error) {
    console.error("Error fetching Instagram details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch Instagram details" });
  }
};


const saveInstagramId = async (req, res) => {
  try {
    console.log(`Request Body:`, req.body);

    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const client_id = req.user.id; // Get client ID from authenticated user
    const { selectedInstaAccount } = req.body; // Get selected Instagram account ID from request

    if (!selectedInstaAccount) {
      return res.status(400).json({ error: "No accounts selected" });
    }

    // Update the database with the selected Instagram account ID
    const updateQuery = `UPDATE client_details SET instagram_business_id = $1 WHERE client_id = $2`;
    const result = await pool.query(updateQuery, [selectedInstaAccount, client_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    console.log("Selected Insta Account ID updated for Client ID:", client_id);

    res.json({ message: "Selected Instagram account saved successfully", selectedInstaAccount });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to process the selected accounts" });
  }
}


const savePageAccessToken = async (req, res) => {
  try {
    const client_id = req.user.id; // Get client ID from authenticated user

    if (!client_id) {
      return res.status(401).json({ error: "Unauthorized: Client ID missing" });
    }
    if (!ACCESS_TOKEN) {
      return res.status(400).json({ error: "Missing User Access Token" });
    }
    if (!PAGE_ID) {
      return res.status(400).json({ error: "Missing Facebook Page ID" });
    }

    // Fetch Page Access Token from Facebook API
    const response = await axios.get(`https://graph.facebook.com/v15.0/${PAGE_ID}`, {
      params: {
        fields: "access_token",
        access_token: ACCESS_TOKEN,
      },
    });

    const pageAccessToken = response.data.access_token;
    PAGE_ACCESS_TOKEN = pageAccessToken;

    if (!pageAccessToken) {
      return res.status(500).json({ error: "Failed to retrieve Page Access Token" });
    }

    console.log(`Page Access Token: ${pageAccessToken}`);

    // SQL Query to update client_details table
    const updateQuery = "UPDATE client_details SET facebook_page_access_token = $1 WHERE client_id = $2";

    // Execute the query
    const result = await pool.query(updateQuery, [pageAccessToken, client_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    console.log("Page Access Token updated for Client ID:", client_id);
    res.json({ message: "Facebook Page Access Token saved successfully", pageAccessToken });

  } catch (error) {
    console.error("Error fetching or saving page access token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to save Page Access Token" });
  }
};


const fetchVideo = async (req, res) => {

  if (!INSTA_ID) {
    return res.status(400).json({ error: 'Missing Instagram Business ID' });
  }

  if (!PAGE_ACCESS_TOKEN) {
    return res.status(400).json({ error: 'Missing Facebook Page Access Token' });
  }

  try {
    const response = await axios.get(`https://graph.facebook.com/v21.0/${INSTA_ID}/media?fields=id,media_type,media_url,caption,like_count&access_token=${PAGE_ACCESS_TOKEN}`);
    const reels = response.data.data.filter((item) => item.media_type === "VIDEO");
    res.json(reels);
  } catch (error) {
    console.error("Error fetching Instagram media:", error.message);
    res.status(500).json({ error: "Failed to fetch reels. Please check your access token." });
  }
};

const getPageAccessToken = async (req, res) => {
  try {
    const client_id = req.user.id; // Get client ID from authenticated user

    if (!client_id) {
      return res.status(401).json({ error: "Unauthorized: Client ID missing" });
    }

    const result = await pool.query(
      "SELECT facebook_page_access_token FROM client_details WHERE client_id = $1",
      [client_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Page Access Token not found" });
    }

    res.json({ pageAccessToken: result.rows[0].facebook_page_access_token });
  } catch (error) {
    console.error("Error fetching token:", error.message);
    res.status(500).json({ error: "Failed to fetch Page Access Token" });
  }
};

const saveVideos = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Client ID missing" });
    }

    const client_id = req.user.id; // Get client ID from authenticated user
    const { videos } = req.body;

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return res.status(400).json({ message: "Invalid video data" });
    }

    // Insert or Update Videos
    for (const video of videos) {
      await pool.query(
        `INSERT INTO video_details (video_id, client_id, likes_count, caption, media_url) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (video_id) DO UPDATE 
         SET likes_count = EXCLUDED.likes_count, 
             caption= EXCLUDED.caption, 
             media_url = EXCLUDED.media_url`,
        [video.id, client_id, video.likes, video.extracted_url, video.media_url]
      );
    }

    res.status(201).json({ message: "Videos saved successfully" });
  } catch (error) {
    console.error("Error saving videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVideoUrlById = async (req, res) => {
  try {
    const { video_id } = req.params; 

    if (!video_id) {
      return res.status(400).json({ error: "Bad Request: video_id is required" });
    }

    // Query to fetch video_id and corresponding caption (URLs)
    const { rows } = await pool.query(
      "SELECT video_id, caption FROM video_details WHERE video_id = $1",
      [video_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No video found with the given ID" });
    }

    // Respond with structured data
    res.status(200).json({
      success: true,
      message: "Video retrieved successfully",
      video: { video_id: rows[0].video_id, url: rows[0].caption },
    });

  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



module.exports = {
  authFacebook,
  authFacebookCallback,
  getFacebookPages,
  saveFacebookPageId,
  getInstagramAccount,
  saveInstagramId,
  savePageAccessToken,
  fetchVideo,
  getPageAccessToken,
  saveVideos,
  getVideoUrlById,
  exampleRoute
};