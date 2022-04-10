const db = require('../models');

module.exports = {
  post: async (req, res) => {
    // 게시글 PK
    const { id } = req.params;

    await db.sequelize.models.Bookmark.create({
      UserId: req.userId,
      BoardId: id,
    }).catch(err =>
      res.status(404).json({ message: `Bookmark can be done only once` }),
    );

    res.status(203).json({ message: `${id} successfully bookmarked` });
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

    res.status(200).json({ message: `${id} bookmark canceled` });
  },
};
