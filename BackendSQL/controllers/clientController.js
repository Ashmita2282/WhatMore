const pool = require('../config/db');
const axios = require('axios');


const getClients =  (req, res) => {
    pool.query('SELECT * FROM clients', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};


const getVideoUrl = async (req, res) => {
    try {
        const client_id = req.user.id;  // Get the authenticated user's ID

        if (!client_id) {
            return res.status(401).json({ error: "Unauthorized: Client ID missing" });
        }

        // Query to get all video_id and their corresponding captions (which contain URLs)
        const result = await pool.query(
            "SELECT video_id, caption FROM video_details WHERE client_id = $1",
            [client_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No videos found" });
        }

        res.json({ videos: result.rows }); // Sending an array of { video_id, caption (URL) }

    } catch (error) {
        console.error("Error fetching videos:", error.message);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
};

  const updateVideoUrl = async (req, res) => {
    try {
      const client_id = req.user.id; 
      const { video_id, extracted_url } = req.body; 
  
      if (!client_id) {
        return res.status(401).json({ error: "Unauthorized: Client ID missing" });
      }
  
      if (!video_id || !extracted_url) {
        return res.status(400).json({ error: "Video ID and extracted URL are required" });
      }
  
      // Update query
      const result = await pool.query(
        `UPDATE video_details 
         SET caption = $1 
         WHERE client_id = $2 AND video_id = $3`,
        [extracted_url, client_id, video_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Video not found" });
      }
  
      res.json({ message: "Extracted URL updated successfully" });
  
    } catch (error) {
      console.error("Error updating extracted URL:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {
    getClients,
    getVideoUrl,
    updateVideoUrl
};