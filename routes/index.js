const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middleware/auth');

router.post('/signup', authController.signup.post);

router.post('/login', authController.login.post); // 토큰이 발급이 됨

router.get('/me', isAuth.authMe.get, authController.me.get); // get 요청을 할 때

module.exports = router;
