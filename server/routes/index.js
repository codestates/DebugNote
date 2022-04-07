const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const boradRouter = require('./board');
const commentRouter = require('./comment');

router.use('/auth', authRouter);
router.use('/board', boradRouter);
router.use('/comment', commentRouter);

// 메인 페이지 불러오기

module.exports = router;
