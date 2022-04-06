const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: {
    post: async (req, res) => {
      const { email, password, nickname, name, job } = req.body;

      if (!email) {
        return res.status(401).json({ message: '이메일 필수 입력' });
      }

      if (!password) {
        return res.status(401).json({ message: '비밀번호 필수 입력' });
      }

      if (!name) {
        return res.status(401).json({ message: '이름 필수 입력' });
      }

      if (!nickname) {
        return res.status(401).json({ message: '닉네임 필수 입력' });
      }

      if (!job) {
        return res.status(401).json({ message: '직업 필수 입력' });
      }

      // validation (nickname, email, password ...) 중복 확인 필요

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        return res.status(409).json({ message: '중복된 유저 입니다.' });
      }

      const hashedPassword = await bcrypt
        .hash(password, config.bcrypt.saltRounds)
        .catch(err => console.log(err));

      const newUser = await User.create({
        email,
        password: hashedPassword,
        nickname,
        name,
        job,
      });

      return res
        .status(201)
        .json({ id: newUser.id, message: '유저가 생성 되었습니다.' });
    },
  },
  login: {
    post: async (req, res) => {
      const { email, password } = req.body;

      if (!email) {
        return res.status(401).json({ message: '이메일 필수 입력' });
      }

      if (!password) {
        return res.status(401).json({ message: '비밀번호 필수 입력' });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ message: '해당 유저가 없습니다.' });
      }

      const isValidPassword = await bcrypt
        .compare(password, user.password)
        .catch(err => console.log(err));

      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      const accToken = await createJwtToken(user.id);
      // console.log(accToken);

      return res
        .status(201)
        .cookie('Bearer ', accToken)
        .json({ accToken, message: '로그인 성공했습니다.' });
    },
  },
  me: {},
};

async function createJwtToken(id) {
  const accToken = jwt.sign({ id }, config.jwt.secret_key, {
    expiresIn: config.jwt.expiresIn,
  });
  return accToken;
}
