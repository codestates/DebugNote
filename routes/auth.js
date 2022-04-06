const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');

// 회원가입
router.post('/signup', authController.signup);

// 회원탈퇴
router.post('/signout', authController.signout);

// 로그인
router.post('/login', authController.login); 

// 로그아웃
router.post('/logout', authController.logout); 

// 인증
router.get('/me', isAuth, authController.me); 

module.exports = router;