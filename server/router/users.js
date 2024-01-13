const router = require('express').Router();

const authController = require('../controllers/Users');

router.post('/login', authController.login);
router.post('/signup', authController.userSignup);

module.exports = router;
