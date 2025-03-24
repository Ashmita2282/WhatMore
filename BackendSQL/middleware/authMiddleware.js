// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid Token" });
//   }
// };

// module.exports = authenticate;

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    console.log("🛡️ Authentication Middleware Running...");
    console.log("🔹 Cookies:", req.cookies);
    console.log("🔹 Authorization Header:", req.headers.authorization);
    console.log("🔹 Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing or invalid." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded Token:", decoded);

    if (!decoded.id || !decoded.email || !decoded.name) {
      return res.status(401).json({ error: "Invalid token: Missing user info" });
    }

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized access." });
  }
};

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, ... }
    // console.log(req.user)
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const authorizeSuperAdmin = (req, res, next) => {
  // req.user should be populated by the authenticate middleware
  if (req.user && req.user.role === "superadmin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied, superadmin only" });
};

module.exports = { authenticate, authorizeSuperAdmin , authenticateUser};
