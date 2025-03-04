const {
  createPlan,
  getAllPlans,
  updatePlanById,
  deletePlanById,
  manageUserSubscription,
} = require("../models/planModel");

// Middleware to check if user is superadmin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res
      .status(403)
      .json({
        error: "Access denied. Only superadmin can perform this action.",
      });
  }
  next();
};

// Controller to add a new plan (Only for superadmin)
const addPlan = async (req, res) => {
  try {
    const { plan_name, description, price, duration_in_months } = req.body;
    const newPlan = await createPlan(
      plan_name,
      description,
      price,
      duration_in_months
    );
    res
      .status(201)
      .json({ message: "Plan created successfully", plan: newPlan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller to retrieve all plans (Accessible by all users)
const fetchPlans = async (req, res) => {
  try {
    const plans = await getAllPlans();
    res.json({ plans });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller to update a plan (Only for superadmin)
const updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { plan_name, description, price, duration_in_months } = req.body;

    const updatedPlan = await updatePlanById(planId, {
      plan_name,
      description,
      price,
      duration_in_months,
    });

    if (!updatedPlan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json({ message: "Plan updated successfully", plan: updatedPlan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller to delete a plan (Only for superadmin)
const deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const deletedPlan = await deletePlanById(planId);

    if (!deletedPlan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller to manage user subscriptions (Only for superadmin)
const manageSubscription = async (req, res) => {
  try {
    const { userId, planId, action } = req.body; // action: "subscribe" or "unsubscribe"

    const result = await manageUserSubscription(userId, planId, action);

    res.json({ message: `Subscription ${action}d successfully`, result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPlan,
  fetchPlans,
  updatePlan,
  deletePlan,
  manageSubscription,
  isSuperAdmin,
};

// // controllers/plansController.js
// const { createPlan, getAllPlans } = require("../models/planModel");

// // Controller to add a new plan (only for superadmin)
// const addPlan = async (req, res) => {
//   try {
//     const { plan_name, description, price, duration_in_months } = req.body;
//     const newPlan = await createPlan(plan_name, description, price, duration_in_months);
//     res.status(201).json({ message: "Plan created successfully", plan: newPlan });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Controller to retrieve all plans
// const fetchPlans = async (req, res) => {
//   try {
//     const plans = await getAllPlans();
//     res.json({ plans });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { addPlan, fetchPlans };
