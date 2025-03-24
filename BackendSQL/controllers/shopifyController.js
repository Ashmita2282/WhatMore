const axios = require("axios");
const pool = require('../config/db');

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_REDIRECT_URL = process.env.SHOPIFY_REDIRECT_URL;

let SHOPIFY_ACCESS_TOKEN = ""; // Store Shopify token in memory

// Step 1: Redirect User to Shopify OAuth
const redirectToShopifyOAuth = (req, res) => {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).json({ error: "Missing shop parameter" });
  }

  const shopifyOAuthURL = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${SHOPIFY_REDIRECT_URL}`;

  console.log(" Redirecting to Shopify OAuth:", shopifyOAuthURL);
  res.redirect(shopifyOAuthURL);
};

// Step 2: Handle Shopify OAuth Callback
const handleShopifyCallback = async (req, res) => {
  const { code, shop } = req.query;

  if (!code || !shop) {
    return res.status(400).json({ error: "Missing code or shop URL" });
  }

  try {
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    SHOPIFY_ACCESS_TOKEN = response.data.access_token;
    console.log(" Shopify Access Token:", SHOPIFY_ACCESS_TOKEN);

    res.redirect(`https://${shop}/admin/apps`);
  } catch (error) {
    console.error(" Error fetching Shopify token:", error.response?.data || error.message);
    res.status(500).json({ error: "Shopify authentication failed" });
  }
};

// Step 3: Retrieve Stored Shopify Access Token
const getShopifyToken = (req, res) => {
  if (!SHOPIFY_ACCESS_TOKEN) {
    return res.status(404).json({ error: "No Shopify token found. Please authenticate first." });
  }
  res.json({ shopifyAccessToken: SHOPIFY_ACCESS_TOKEN });
};

// Step 4: Manually Save Shopify Credentials
const manualShopifyConnect = async (req, res) => {
    console.log(req.body);
    const { shopName, apiKey, password, sharedSecret } = req.body;
    const client_id = req.user.id; // Extract client_id from req.user.id
  
    try {
      const result = await pool.query(
        "UPDATE client_details SET shopify_store_name= $1, shopify_api_key = $2, shopify_access_token = $3, shopify_shared_secret = $4 WHERE client_id = $5",
        [shopName, apiKey, password, sharedSecret, client_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      res.status(200).json({ message: "Credentials saved successfully!", data: result.rows[0] });
    } catch (error) {
      console.error(" Error saving credentials:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
module.exports = {
  redirectToShopifyOAuth,
  handleShopifyCallback,
  getShopifyToken,
  manualShopifyConnect,
};
