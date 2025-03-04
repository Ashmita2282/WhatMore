const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const createTables = require("./config/createTables"); // Import table creation script
const superadminRoutes = require("./routes/superadminRoutes");
const planRoutes = require("./routes/planRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Run table creation script on server startup
createTables();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/superadmin", superadminRoutes);
app.use("/api/plans", planRoutes); // Use this route for plan operations

app.get("/", (req, res) => {
  res.send("Welcome to the Super Admin API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
