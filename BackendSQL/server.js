const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const createTables = require("./config/createTables"); // Import table creation script
const superadminRoutes = require("./routes/superadminRoutes");
const planRoutes = require("./routes/planRoutes");
const clientRoutes= require("./routes/clientRoutes");
const facebookRoutes = require("./routes/facebookRoutes");
const shopifyRoutes = require("./routes/shopifyRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());


// Run table creation script on server startup
createTables();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/superadmin", superadminRoutes);
app.use("/api/plans", planRoutes); // Use this route for plan operations
app.use('/auth/facebook', facebookRoutes);
app.use('/client',clientRoutes);
app.use('/auth/shopify', shopifyRoutes);
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
