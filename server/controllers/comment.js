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

    res.status(200).json({ message: '댓글을 추가했습니다' });
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
    const { id } = req.params;
    const { commentId, comment } = req.body;

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

    res.status(200).json({ message: '댓글을 수정했습니다' });
  },
  remove: async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;

    await db.sequelize.models.Comment.destroy({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    res.status(200).json({ message: 'Comment Succesfully deleted' });
  },
};
