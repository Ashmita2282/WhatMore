const { Router } = require("express");
const facebookController = require("../controllers/facebookController");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/example", authMiddleware.authenticateUser, facebookController.exampleRoute); // ✅ Pass a valid function
router.get('/',  authMiddleware.authenticateUser, facebookController.authFacebook);
router.get('/callback',authMiddleware.authenticateUser,facebookController.authFacebookCallback);
router.get('/page_id', authMiddleware.authenticateUser,facebookController.getFacebookPages);
router.post("/save_pageId", authMiddleware.authenticateUser, facebookController.saveFacebookPageId);
router.get("/getInstagramAccount", authMiddleware.authenticateUser, facebookController.getInstagramAccount);
router.post("/insta/accounts", authMiddleware.authenticateUser, facebookController.saveInstagramId);
router.get("/save_page_access_token", authMiddleware.authenticateUser, facebookController.savePageAccessToken);
router.get("/get_page_access_token", authMiddleware.authenticateUser, facebookController.getPageAccessToken);
router.get("/api/videos", authMiddleware.authenticateUser, facebookController.fetchVideo);
router.post("/saveVideos", authMiddleware.authenticateUser, facebookController.saveVideos);
router.get("/video_url/:video_id", facebookController.getVideoUrlById)

module.exports = router;