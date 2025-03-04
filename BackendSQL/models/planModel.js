const pool = require("../config/db");

// Function to create a new plan
const createPlan = async (
  plan_name,
  description,
  price,
  duration_in_months
) => {
  const query = `
    INSERT INTO plans (plan_name, description, price, duration_in_months)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    plan_name,
    description,
    price,
    duration_in_months,
  ]);
  return rows[0];
};

// Function to fetch all plans
const getAllPlans = async () => {
  const query = "SELECT * FROM plans";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to update a plan by ID
const updatePlanById = async (planId, updatedFields) => {
  const { plan_name, description, price, duration_in_months } = updatedFields;
  const query = `
    UPDATE plans 
    SET plan_name = $1, description = $2, price = $3, duration_in_months = $4
    WHERE id = $5 RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    plan_name,
    description,
    price,
    duration_in_months,
    planId,
  ]);

  return rows.length > 0 ? rows[0] : null; // Return updated row or null if not found
};

// Function to delete a plan by ID
const deletePlanById = async (planId) => {
  const query = "DELETE FROM plans WHERE id = $1 RETURNING id;";
  const { rows } = await pool.query(query, [planId]);

  return rows.length > 0; // Returns true if deleted, false otherwise
};

// Function to manage user subscriptions (subscribe/unsubscribe)
const manageUserSubscription = async (userId, planId, action) => {
  if (action === "subscribe") {
    const query = `
      INSERT INTO user_subscriptions (user_id, plan_id) 
      VALUES ($1, $2)
      ON CONFLICT (user_id) DO UPDATE SET plan_id = EXCLUDED.plan_id
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, planId]);
    return { userId, planId, status: "Subscribed", data: rows[0] };
  } else if (action === "unsubscribe") {
    const query =
      "DELETE FROM user_subscriptions WHERE user_id = $1 AND plan_id = $2 RETURNING id;";
    const { rows } = await pool.query(query, [userId, planId]);

    return {
      userId,
      planId,
      status: rows.length > 0 ? "Unsubscribed" : "Not Found",
    };
  } else {
    throw new Error("Invalid action. Use 'subscribe' or 'unsubscribe'.");
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  updatePlanById,
  deletePlanById,
  manageUserSubscription,
};

// const pool = require("../config/db");

// // Create a new plan
// const createPlan = async (plan_name, description, price, duration_in_months) => {
//   const query = `
//     INSERT INTO plans (plan_name, description, price, duration_in_months)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *
//   `;
//   const values = [plan_name, description, price, duration_in_months];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

// // Get all plans
// const getAllPlans = async () => {
//   const query = `SELECT * FROM plans ORDER BY created_at DESC`;
//   const { rows } = await pool.query(query);
//   return rows;
// };

// // Assign a plan to a client (create a record in client_plans)
// const assignPlanToClient = async (client_id, plan_id, start_date, end_date) => {
//   const query = `
//     INSERT INTO client_plans (client_id, plan_id, start_date, end_date)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *
//   `;
//   const values = [client_id, plan_id, start_date, end_date];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

// module.exports = { createPlan, getAllPlans, assignPlanToClient };
