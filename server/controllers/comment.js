const db = require('../models');

module.exports = {
  post: async (req, res) => {
    // id: 게시글 PK
    const { id } = req.params;
    const { comment } = req.body;

    await db.sequelize.models.Comment.create({
      UserId: req.userId,
      BoardId: id,
      comment: comment,
    });

    res.status(200).json({ message: '댓글을 추가했습니다.' });
  },
  get: async (req, res) => {
    // const result = await User.findOne({
    //   where: { id: req.userId },
    //   include: {
    //     model: Board,
    //     attributes: ['comment'],
    //   }
    // })
    // res.status(200)
  },
  put: async (req, res) => {
    const { id } = req.params; // 게시물의 id
    const { commentId, comment } = req.body;

    const comments = await db.sequelize.models.Comment.findOne({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    // console.log(comments);

    if (!comments) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

    await db.sequelize.models.Comment.update(
      {
        comment: comment,
      },
      {
        where: {
          id: commentId,
          UserId: req.userId,
          BoardId: id,
        },
      },
    );

    res.status(200).json({ message: '댓글을 수정 했습니다.' });
  },
  remove: async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;

    const comments = await db.sequelize.models.Comment.findOne({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    if (!comments) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

    await db.sequelize.models.Comment.destroy({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    res.status(200).json({ message: '댓글을 삭제했습니다.' });
  },
};
