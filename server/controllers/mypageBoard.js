const Board = require('../models/board');
const pagenation = require('../middlewares/pagenation');

module.exports = {
  get: async (req, res) => {
    const { page, limit } = req.query;
    if (!req.userId) {
      return res.status(401).json({ message: '해당 유저 id가 없습니다.' });
    }

    const board = await pagenation.myBoards(req.userId, page, limit);

    if (board.count === 0) {
      return res.status(400).json({ messgae: '내가 쓴 게시물이 없습니다.' });
    }

    return res
      .status(200)
      .json({ board, message: '내가 쓴 게시물을 불러왔습니다.' });
  },
};
