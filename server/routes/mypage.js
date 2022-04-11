const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');
const isAuth = require('../middlewares/auth');

router.get('/', isAuth, mypageController.get);

module.exports = router;
