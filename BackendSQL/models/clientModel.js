const pool = require("../config/db");

// Add a new client
const createClient = async (name, email, phone, address) => {
  const query = `
    INSERT INTO clients (name, email, phone, address)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [name, email, phone, address];
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

module.exports = { createClient, deleteClient, getAllClients };
