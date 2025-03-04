const { createClient, deleteClient, getAllClients } = require("../models/clientModel");
const { getAllPlans, assignPlanToClient } = require("../models/planModel");

// Create a new client (accessible only to superadmins)
const addClient = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const client = await createClient(name, email, phone, address);
    res.status(201).json({ message: "Client added successfully", client });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a client
const removeClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const deleted = await deleteClient(clientId);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client removed successfully", client: deleted });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all clients along with their plan details
const fetchClients = async (req, res) => {
  try {
    const clients = await getAllClients();
    res.json({ clients });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Assign a plan to a client (for example, from a dropdown on the frontend)
const assignPlan = async (req, res) => {
  try {
    const { client_id, plan_id, start_date, end_date } = req.body;
    const assignment = await assignPlanToClient(client_id, plan_id, start_date, end_date);
    res.json({ message: "Plan assigned successfully", assignment });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addClient, removeClient, fetchClients, assignPlan };
