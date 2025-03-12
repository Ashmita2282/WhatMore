const {Router} = require('express');
const clientController = require('../controllers/clientController');
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get('/', authMiddleware.authenticateUser, clientController.getClients);
router.get('/getVideoUrl', authMiddleware.authenticateUser, clientController.getVideoUrl)
router.post('/updateVideoUrl',authMiddleware.authenticateUser,  clientController.updateVideoUrl)

module.exports = router;
