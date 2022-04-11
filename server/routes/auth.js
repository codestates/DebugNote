const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');
const { body } = require('express-validator');
const validation = require('../middlewares/validator');
const User = require('../models/user');

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

router.post('/login', authController.login);

// 로그아웃
router.post('/logout', authController.logout);

// 회원탈퇴
router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params
  if ( req.userId === id ) {
    return res.status(400).json({ message: '유저가 일치하지 않습니다'})
  }

  await User.destroy({
    where: { id: req.userId }
  })

  res.status(204).json({ message: `회원이 탈퇴처리 되었습니다.`})

});

// 인증
router.get('/me', isAuth, authController.me);

module.exports = router;
