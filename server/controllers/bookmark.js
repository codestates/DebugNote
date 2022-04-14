const db = require('../models');

module.exports = {
  post: async (req, res) => {
    // 게시글 PK
    const { id } = req.params;

    await db.sequelize.models.Bookmark.create({
      UserId: req.userId,
      BoardId: id,
    }).catch(err =>
      res.status(404).json({ message: '이미 북마크가 되어있습니다.' }),
    );

    res.status(203).json({ message: '북마크 되었습니다.' });
  },

  remove: async (req, res) => {
    // 게시글 PK
    const { id } = req.params;

    await db.sequelize.models.Bookmark.destroy({
      where: {
        UserId: req.userId,
        BoardId: id,
      },
    });

    res.status(200).json({ message: '북마크가 삭제 되었습니다.' });
  },
};
