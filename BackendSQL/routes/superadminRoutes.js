const express = require("express");
const router = express.Router();
const { addClient, removeClient, fetchClients, assignPlan } = require("../controllers/superadminController");

// Routes to manage clients and plans (accessible only to superadmins, add authentication middleware as needed)
router.post("/clients", addClient);
router.delete("/clients/:clientId", removeClient);
router.get("/clients", fetchClients);
router.post("/assign-plan", assignPlan);

module.exports = router;
