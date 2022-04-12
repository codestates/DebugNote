const Board = require('../models/board');
const pagenation = require('../middlewares/pagenation');

module.exports = {
  get: async (req, res) => {
    const { page, limit } = req.query;

    const board = await pagenation.myBoards(req.userId, page, limit);

    if (board.count === 0) {
      return res.status(400).json({ messgae: '내가 쓴 게시물이 없습니다.' });
    }

    return res
      .status(200)
      .json({ board, message: '내가 쓴 게시물을 불러왔습니다.' });
  },
};
