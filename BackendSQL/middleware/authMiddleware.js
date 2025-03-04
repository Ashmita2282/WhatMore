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

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, ... }
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

module.exports = { authenticate, authorizeSuperAdmin };
