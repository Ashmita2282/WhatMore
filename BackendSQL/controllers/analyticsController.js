const pool = require('../config/db');
const axios = require('axios');

// Get all clients
const getTest = (req, res) => {
    res.send("getClients function called"); // Log when the function is invoked
};


// Get count for authenticated client
const getCount = async (req, res) => {
    const clientId = req.user.id;  
    console.log("Client ID:", clientId);
    if (!clientId) return res.status(400).json({ error: "Client ID missing" });

    try {
        const { rows } = await pool.query('SELECT count FROM client_details WHERE client_id = $1', [clientId]);
        console.log("Query result:", rows);
        rows.length ? res.json({ count: rows[0].count }) : res.status(404).json({ error: "Client not found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update count for authenticated client
const postCount = async (req, res) => {
    console.log("count:", req.body);
    const clientId = req.user.id;
    if (!clientId || req.body.count === undefined) return res.status(400).json({ error: "Missing fields" });

    try {
        const { rows } = await pool.query('UPDATE client_details SET count = $1 WHERE client_id = $2 RETURNING *', [req.body.count, clientId]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Client not found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get count for authenticated client
const getCartCount = async (req, res) => {
    const clientId = req.user.id;  
    console.log("Running get cart count:", clientId);
    if (!clientId) return res.status(400).json({ error: "Client ID missing" });

    try {
        const { rows } = await pool.query('SELECT add_to_cart_clicks FROM client_details WHERE client_id = $1', [clientId]);
        console.log("Query result:", rows);
        rows.length ? res.json({ count: rows[0].count }) : res.status(404).json({ error: "Client not found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update count for authenticated client
const postCartCount = async (req, res) => {
    console.log("count:", req.body);
    const clientId = req.user.id;
    if (!clientId || req.body.count === undefined) return res.status(400).json({ error: "Missing fields" });
    try {
        const { rows } = await pool.query('UPDATE client_details SET add_to_cart_clicks = $1 WHERE client_id = $2 RETURNING *', [req.body.count, clientId]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Client not found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {getTest, getCount, postCount, getCartCount, postCartCount};
