const jwt = require('jsonwebtoken');
const User = require('../models/user')
require('dotenv').config();
 
module.exports = async (req, res, next) => {
    let token;
    // 토큰이 헤더로 전달되었을 때
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    
    // 토큰이 쿠키로 전달되었을 때
    if (!token) {
        token = req.cookies['token'];
      }
    
    if (!token) {
        return res.status(401).json(AUTH_ERROR);
      }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: 'Invalid Token'});
        }
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'Authentication Error'});
        }
        req.userId = user.id; // req.customData
        req.token = token;
        next();
      });
    };