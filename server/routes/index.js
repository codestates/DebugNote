const express = require('express');
const { route } = require('./auth');
const router = express.Router();

const authRouter = require('./auth');
const boradRouter = require('./board');

router.use('/auth', authRouter);
router.use('/board', boradRouter);

// 메인 페이지 불러오기

module.exports = router;
