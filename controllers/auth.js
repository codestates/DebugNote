const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

module.exports = {
  // 회원가입
  signup: async (req, res) =>{
    
  },
  // 회원탈퇴
  signout: async (req, res) =>{
    
  },  
  // 로그인
  login: async (req, res) => {
    
  },
  // 로그아웃
  logout: async (req, res) =>{
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
  }
};


const options = {
  maxAge: config.jwt.expiresInSec * 1000,
  httpOnly: true, // 자바스크립트 쿠키 조회 금지
  sameSite: 'none', // 크로스 사이트 전송 허용
  // secure: true, // HTTPS 설정
};
res.cookie('token', token, options);