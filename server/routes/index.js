const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
<<<<<<< HEAD

router.use('/auth', authRouter);
=======
const boradRouter = require('./board');
const commentRouter = require('./comment');

router.use('/auth', authRouter);
router.use('/board', boradRouter);
router.use('/comment', commentRouter);

// 메인 페이지 불러오기
>>>>>>> 1fa809e757913b452ca780ba9a8fbc115d11812f

module.exports = router;
