const Board = require('../models/board');
const pagenation = require('../middlewares/pagenation');

module.exports = {
  get: async (req, res) => {
    const { pages, limit } = req.query;

    const boards = await pagenation.myBookmarks(req.userId, pages, limit);
    // console.log(boards);

    if (boards.count === 0) {
      return res
        .status(400)
        .json({ message: '내가 북마크 한 게시물이 없습니다.' });
    }

    return res.status(200).json({
      boards,
      message: '내가 북마크 한 게시물을 불러왔습니다.',
    });
  },
};
