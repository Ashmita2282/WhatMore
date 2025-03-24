const { Router } = require("express");
const shopifyController = require("../controllers/shopifyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();


router.get("/", authMiddleware.authenticateUser, shopifyController.redirectToShopifyOAuth);
router.get("/callback",authMiddleware.authenticateUser, shopifyController.handleShopifyCallback);
router.get("/get_shopify_token",authMiddleware.authenticateUser, shopifyController.getShopifyToken);
router.post("/manual_shopify_connect", authMiddleware.authenticateUser, shopifyController.manualShopifyConnect);

module.exports = router;
