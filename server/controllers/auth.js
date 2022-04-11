const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname, name, job } = req.body;

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
  // 로그인
  login: async (req, res) => {
    const { email, password } = req.body;

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
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const accToken = await createJwtToken(user.id);
    // console.log(accToken);
    // console.log(res)
    return res
      .status(201)
      .cookie('token', accToken, {
        // httpOnly: true,
        // secure: true,
        // sameSite: 'Lax',
      })
      .json({ accToken, message: '로그인 성공했습니다.' });
  },
  // 로그아웃
  logout: async (req, res) => {
    res.cookie('token', '');
    res.status(200).json({ message: 'User has been logged out' });
  },
  // 인증
  me: async (req, res) => {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username });
  },
};

async function createJwtToken(id) {
  const accToken = jwt.sign({ id }, config.jwt.secret_key, {
    expiresIn: config.jwt.expiresIn,
  });
  return accToken;
}
