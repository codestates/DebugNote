const Board = require('../models/board');

module.exports = {
  post: async (req, res, next) => {
    const { title, content, picture } = req.body;

    if (!title) {
      return res.status(401).json({ message: '제목 필수 입력' });
    }
    if (!content) {
      return res.status(401).json({ message: '본문 내용 필수 입력' });
    }

    const newBoard = await Board.create({
      title,
      content,
      picture,
    });

    return res
      .status(203)
      .json({ id: newBoard.id, message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res, next) => {},
  put: async (req, res, next) => {},
  remove: async (req, res, next) => {},
};
