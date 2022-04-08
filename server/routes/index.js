const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const boradRouter = require('./board');
const commentRouter = require('./comment');

router.use('/auth', authRouter);
router.use('/board', boradRouter);
router.use('/comment', commentRouter);

const Board = require('../models/board');
const sequelize = require('sequelize');
const Op = sequelize.Op;
// 메인 페이지 불러오기

router.get('/', async (req, res) => {
  const { page, start, limit } = req.query;

  // start + 10
  console.log(start);
  const boards = await Board.findAll({
    order: [['id', 'desc']],
    where: {
      id: { [Op.between]: [start, limit] },
    },
  });

  if (boards.length === 0) {
    return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
  }

  res
    .status(200)
    .json({ boards, message: `${page}페이지 게시물들을 가져왔습니다.` });
});

module.exports = router;
