const { Router } = require('express');
const authController = require('../../controllers/authController');

const router = Router();

// router.get('/', authController.get);
router.post('/signup', authController.signupPost);
router.post('/login', authController.loginPost);
// router.put('/:id', authController.put);
// router.delete('/:id', authController.delete);

module.exports = router;
