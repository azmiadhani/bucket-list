const { Router } = require('express');
const authController = require('../../controllers/authController');

const router = Router();

router.post('/signup', authController.signupPost);
router.post('/login', authController.loginPost);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
