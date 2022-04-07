const Board = require('../models/board');
  
module.exports = {
  post: async (req, res) => {
    const { title, content, picture } = req.body;

    if (!title) {
      return res.status(401).json({ message: '제목 필수 입력' });
    }
    if (!content) {
      return res.status(401).json({ message: '본문 내용 필수 입력' });
    }

    const newBoard = await Board.create({
      UserId: req.userId,
      title,
      content,
      picture,
      totalComment: 0,
      totalBookmark: 0,
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
