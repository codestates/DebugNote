const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
// const tweetRouter = require('./tweet');
// const mypageRouter = require('./mypage');

router.use('/auth', authRouter);
// router.use('/tweet', tweetRouter);
// router.use('/mypage', mypageRouter);

module.exports = router;
