const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const User = require('../models/user');
const config = require('../config');

// const userController = require('../controllers/user');

// Mypage - 내가 쓴 글
// router.get('/boards', isAuth, (req, res) => );

// Mypage - 북마크 글
// router.get('/bookmark', isAuth, commentController.get);

// Mypage - 내 정보 수정
router.put('/', isAuth, async (req, res) => {
  const { email, nickname, name, job, password } = req.body;

  const userFind = await User.findByPk(req.userId);

  if (!userFind) {
    return res.status(400).json({ message: 'User not Found ' });
  }

  // 기존 비밀번호 확인 절차, 협의 필요
  //   const isValidPassword = await bcrypt
  //   .compare(originPassword, userFind.password)
  //   .catch(err => console.log(err));

  //   if (!isValidPassword) {
  //     return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  //   }

  // 유저 정보 업데이트
  const hashedPassword = await bcrypt
    .hash(password, config.bcrypt.saltRounds)
    .catch(err => console.log(err));

  await User.update(
    {
      email,
      password: hashedPassword,
      nickname,
      name,
      job,
    },
    {
      where: { id: req.userId },
    },
  );

  res.status(200).json({ message: '유저 정보가 수정되었습니다.' });
});

module.exports = router;
