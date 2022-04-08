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

    // 북마크 수 같이
    return res
      .status(203)
      .json({ id: newBoard.id, message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: 'param이 없습니다.' });
    }

    const board = await Board.findAll({
      where: {
        id: id,
      },
    });

    if (board.length === 0) {
      return res
        .status(404)
        .json({ messgae: '해당 게시물이 존재하지 않습니다.' });
    }
    // console.log(board);
    // const { title, content, picture } = board;

    return res.status(201).json({ board, message: '게시물을 가져왔습니다.' });
  },
  put: async (req, res) => {},
  remove: async (req, res) => {},
};
