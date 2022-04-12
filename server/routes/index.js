const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const boardRouter = require('./board');
const commentRouter = require('./comment');
const bookmarkRouter = require('./bookmark');
const searchRouter = require('./search');
const mypageRouter = require('./mypage');

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
  page = Number(req.query.pages || 1);
  console.log(page);
  const boards = await pagenation.getBoards(pages, limit);

  if (boards.rows.length === 0) {
    return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
  }

  res
    .status(200)
    .json({ boards, message: `${pages}번 페이지 게시물들을 가져왔습니다.` });
});

module.exports = router;
