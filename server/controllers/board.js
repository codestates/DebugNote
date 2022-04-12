const Board  = require('../models/board');
const Comment  = require('../models/comment');
const User = require('../models/user');
const Sequelize = require('sequelize');
const SequelModel = Sequelize.Sequelize;

module.exports = {
  post: async (req, res) => {
    const { title, content } = req.body;

   const board = await Board.create({
      title,
      content,
      UserId: req.userId,
      picture: 'dummy',
    });

    res.status(203).json({ boardId: board.id, message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res) => {
    const { id } = req.params;
