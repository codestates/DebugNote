
const Comment = require('../models/comment');
const User = require('../models/user');
const Sequelize = require('sequelize');
const SequelModel = Sequelize.Sequelize;

module.exports = {
  post: async (req, res) => {
    // id: 게시글 PK
    const { id } = req.params;
    const { comment } = req.body;

    const newComment = await Comment.create({
      UserId: req.userId,
      BoardId: id,
      comment: comment,
    });

    const nickname = await newComment.getUser({ attributes: ['nickname'] });
    // console.log(nickname.nickname);
    res.status(200).json({
      comment: newComment,
      nickname: nickname.nickname,
      message: '댓글을 추가했습니다.',
    });

  },
  get: async (req, res) => {},
  put: async (req, res) => {
    const { id } = req.params; // 게시물의 id
    const { commentId, comment } = req.body;

    const comments = await Comment.findOne({
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

    const updateComment = await Comment.update(
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

    const newComment = await Comment.findAll({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
      attributes: [
        'id',
        'comment',
        'createdAt',
        'updatedAt',
        [SequelModel.col('User.nickname'), 'nickname'],
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    // console.log(updateComment[0]);
    console.log(newComment);

    res
      .status(200)
      .json({ comment: newComment, message: '댓글을 수정 했습니다.' });
  },
remove: async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;

    const comments = await Comment.findOne({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    if (!comments) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

    await Comment.destroy({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      },
    });

    const newComment = await Comment.findAll({
      order: [['createdAt', 'desc']],
      where: {
        BoardId: id,
      },
      attributes: [
        'id',
        'comment',
        'createdAt',
        'updatedAt',
        [SequelModel.col('User.nickname'), 'nickname'],
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    // console.log(newComment);
    res
      .status(200)
      .json({ comment: newComment, message: '댓글을 삭제했습니다.' });
  },
};
