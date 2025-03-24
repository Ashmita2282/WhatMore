const pool = require('../config/db');
const axios = require('axios');
const clientModel = require('../models/clientModel');

// Get all clients
const getClients = (req, res) => {
    pool.query('SELECT * FROM clients', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// Get client profile by ID
const getClientProfile = async (req, res) => {
    try {
        const client_id = req.user.id;  // Get authenticated client ID

        if (!client_id) {
            return res.status(401).json({ error: "Unauthorized: Client ID missing" });
        }

        const client = await clientModel.getClientById(client_id);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.json(client);
    } catch (error) {
        console.error("Error fetching client profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update client profile (only name for now)
const updateClientProfile = async (req, res) => {
    try {
        const client_id = req.user.id;
        const { name, email } = req.body;

        if (!client_id) {
            return res.status(401).json({ error: "Unauthorized: Client ID missing" });
        }

        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required" });
        }

        const updatedClient = await clientModel.updateClientById(client_id, name, email);
        if (!updatedClient) {
            return res.status(404).json({ error: "Client not found or no changes made" });
        }

        res.json({ message: "Profile updated successfully", client: updatedClient });
    } catch (error) {
        console.error("Error updating client profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Video URL
const getVideoUrl = async (req, res) => {
    try {
        const client_id = req.user.id;

        if (!client_id) {
            return res.status(401).json({ error: "Unauthorized: Client ID missing" });
        }

        const result = await pool.query(
            "SELECT video_id, caption FROM video_details WHERE client_id = $1",
            [client_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No videos found" });
        }

        res.json({ videos: result.rows });

    } catch (error) {
        console.error("Error fetching videos:", error.message);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
};

// Update Video URL
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
    getClientProfile,
    updateClientProfile,
    getVideoUrl,
    updateVideoUrl
};
