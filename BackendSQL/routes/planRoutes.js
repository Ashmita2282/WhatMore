const express = require("express");
const { addPlan, fetchPlans, updatePlan, deletePlan, manageSubscription, isSuperAdmin } = require("../controllers/plansController");

const router = express.Router();

router.post("/add", isSuperAdmin, addPlan);          // Create a plan (Superadmin only)
router.get("/all", fetchPlans);                      // Get all plans (Public)
router.put("/:planId", isSuperAdmin, updatePlan);    // Edit a plan (Superadmin only)
router.delete("/:planId", isSuperAdmin, deletePlan); // Delete a plan (Superadmin only)
router.post("/subscription", isSuperAdmin, manageSubscription); // Manage subscription (Superadmin only)

module.exports = router;


// routes/planRoutes.js
// const express = require("express");
// const router = express.Router();
// const { addPlan, fetchPlans } = require("../controllers/plansController");
// const { authenticate, authorizeSuperAdmin } = require("../middleware/authMiddleware");

// // Only superadmins can create a new plan
// router.post("/", authenticate, authorizeSuperAdmin, addPlan);

// // Anyone authenticated (or even public, depending on your design) can get the plans
// router.get("/", fetchPlans);

// module.exports = router;
