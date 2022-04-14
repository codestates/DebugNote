const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const boardRouter = require('./board');
const commentRouter = require('./comment');
const bookmarkRouter = require('./bookmark');
const searchRouter = require('./search');
const mypageRouter = require('./mypage');

const Board = require('../models/board');
const User = require('../models/user');
const db = require('../models');

router.use('/auth', authRouter);
router.use('/boards', boardRouter);
router.use('/comments', commentRouter);
router.use('/bookmarks', bookmarkRouter);
router.use('/search', searchRouter);
router.use('/users', mypageRouter);

const pagenation = require('../middlewares/pagenation');
// 메인 페이지 불러오기

router.get('/', async (req, res) => {
  // const { page, start, limit } = req.query;
  let { pages, limit } = req.query;
  pages = Number(req.query.pages || 1);

  const boards = await pagenation.getBoards(pages, limit);
  

  // 북마크 갯수 내려주기
  // const boardsId = boards.rows.map(board => {
  //   return board.id;
  // });
  // // console.log(boardsId);

  // const countBookmark = await pagenation.countBookmark(boardsId);

  // if (boards.rows.length === 0) {
  //   return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
  // }

  // for (let i = 0; i < 10; i++) {
  //   boards.rows[i].dataValues['totalBookmark'] = countBookmark[i];
  // }

  res
    .status(200)
    .json({ boards, message: `${pages}번 페이지 게시물들을 가져왔습니다.` });
});

module.exports = router;
