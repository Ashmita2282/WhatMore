// const pool = require("../config/db");

// // Create a new super admin (Signup)
// // Now accepts a role parameter from the frontend
// const createSuperAdmin = async (name, email, hashedPassword, role = 'superadmin') => {
//   const query = `
//     INSERT INTO superadmin (name, email, password, role)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id, name, email, role
//   `;
//   const values = [name, email, hashedPassword, role];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

// // Find super admin by email (For login)
// const findSuperAdminByEmail = async (email) => {
//   const query = `SELECT * FROM superadmin WHERE email = $1`;
//   const { rows } = await pool.query(query, [email]);
//   return rows[0];
// };

// module.exports = { createSuperAdmin, findSuperAdminByEmail };

const pool = require("../config/db");

// Create a new superadmin
const createSuperAdmin = async (
  name,
  email,
  hashedPassword,
  role = "superadmin"
) => {
  const query = `
    INSERT INTO superadmin (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;
  const values = [name, email, hashedPassword, role];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Find superadmin (or admin) by email
const findSuperAdminByEmail = async (email) => {
  const query = `SELECT * FROM superadmin WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

module.exports = { createSuperAdmin, findSuperAdminByEmail };
