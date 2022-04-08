const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');
const { body } = require('express-validator');
const validation = require('../middlewares/validator');

// 회원가입
router.post(
  '/signup',
  [
    // isEmail
    body('email').exists().isEmail().trim().bail(),
    body('password')
      .exists()
      .isLength({ min: 8, max: 20 })
      .trim()
      .contains()
      .bail(), // 최소 영문, 숫자
    body('name').exists().trim().isLength({ min: 3, max: 10 }).bail(),
    body('nickname').exists().isLength({ min: 3, max: 20 }).trim().bail(),
    body('job').exists().bail(),
    validation,
  ],
  authController.signup,
);

// 회원탈퇴
router.post('/signout', authController.signout);

// 로그인
// router.post(
//   '/login',
//   [
//     body('email').exists().isEmail().bail(),
//     body('password').exists().isLength({ min: 8, max: 20 }).bail(),
//     validation,
//   ],
//   authController.login,
// );

router.post(
  '/login',
  authController.login,
);

// 로그아웃
router.post('/logout', authController.logout);

// 인증
router.get('/me', isAuth, authController.me);

module.exports = router;
