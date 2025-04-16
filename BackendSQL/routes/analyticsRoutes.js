const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", analyticsController.getTest);
router.get("/getCount", authMiddleware.authenticateUser, analyticsController.getCount);
router.post("/postCount", authMiddleware.authenticateUser, analyticsController.postCount);
router.get("/getCartCount", authMiddleware.authenticateUser, analyticsController.getCartCount);
router.post("/postCartCount", authMiddleware.authenticateUser, analyticsController.postCartCount);



module.exports = router;
