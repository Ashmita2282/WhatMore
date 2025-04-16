// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const {
//   createSuperAdmin,
//   findSuperAdminByEmail,
// } = require("../models/superadminModel");

// // Signup Controller
// const signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if the user already exists
//     const existingUser = await findSuperAdminByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create the user with the provided role (role: "superadmin", "admin", "customer")
//     const newUser = await createSuperAdmin(name, email, hashedPassword, role);

//     res.status(201).json({
//       message: "Signup successful",
//       user: newUser,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Login Controller
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await findSuperAdminByEmail(email);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare provided password with stored hash
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { signup, login };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {
  createSuperAdmin,
  findSuperAdminByEmail,
} = require("../models/superadminModel");

const{
  createClient,
  findClientByEmail,
} = require("../models/clientModel");

// Function to generate a unique store ID
const generateStoreId = () => {
  return `${uuidv4().slice(0, 8)}`;
};

// Signup Controller for Superadmin (or admin, based on role)
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await findSuperAdminByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const store_id = generateStoreId(); // Generate a unique store ID

    let newUser; 

    // Create the user based on role
    if (role === "superadmin") {
      newUser = await createSuperAdmin(name, email, hashedPassword, role);
    } else if (role === "client") {
      newUser = await createClient(name, email, hashedPassword, store_id, role);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Login Request:", req.body);

    let user = null;

    if (role === "superadmin") {
      user = await findSuperAdminByEmail(email);
    } else if (role === "client") {
      user = await findClientByEmail(email);
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (role === "client") {
      tokenPayload.store_id = user.store_id; // Add store_id for clients
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token in cookies (HTTP Only)
    res.cookie("token", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

    // Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(role === "client" && { store_id: user.store_id }), // Only add store_id for clients
      },
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { signup, login };