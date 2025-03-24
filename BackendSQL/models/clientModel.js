const pool = require("../config/db");

// Add a new client
const createClient = async (name, email, password) => {
  const query = `
    INSERT INTO clients (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [name, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Remove a client by id
const deleteClient = async (clientId) => {
  const query = `DELETE FROM clients WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [clientId]);
  return rows[0];
};

// Get all clients with their chosen plan details (if any)
const getAllClients = async () => {
  const query = `
    SELECT c.*, p.plan_name, p.price, cp.start_date, cp.end_date, cp.status AS plan_status
    FROM clients c
    LEFT JOIN client_plans cp ON c.id = cp.client_id
    LEFT JOIN plans p ON cp.plan_id = p.id
    ORDER BY c.created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Find superadmin (or admin) by email
const findClientByEmail = async (email) => {
  const query = `SELECT * FROM clients WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

// Get client profile by ID
const getClientById = async (id) => {
  const query = `SELECT id, name, email FROM clients WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Update client profile (only name for now)
const updateClientById = async (id, name, email) => { 
  const query = `UPDATE clients SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
  const { rows } = await pool.query(query, [name, email, id]);
  return rows[0];
};


module.exports = { createClient, deleteClient, getAllClients, findClientByEmail, getClientById, updateClientById };
