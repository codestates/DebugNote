const Board = require('../models/board');

module.exports = {
  post: async (req, res) => {
    const { title, content, picture } = req.body;

    const newBoard = await Board.create({
      UserId: req.userId,
      title,
      content,
      picture,
    });

    return res
      .status(203)
      .json({ id: newBoard.id, message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res) => {
    
  },
  put: async (req, res) => {},
  remove: async (req, res) => {},
};
