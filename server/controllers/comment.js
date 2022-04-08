const Board = require('../models/board');
const User = require('../models/user');
const db = require('../models');


module.exports = {
  post: async (req, res) => {
    // id: 게시글 PK
    // console.log(db)
    const { id } = req.params;
    const { comment } = req.body;


    const addComment = await db.sequelize.models.Comment.create({
      UserId: req.userId,
      BoardId: id,
      comment: comment,


    const findBoard = await Board.findOne({ where: { id } })
    // const commenta = await comment.findAll({})
    // console.log(commenta)

    await findBoard.addComment(req.userId, {
      through: {
        comment: comment
      }

    })

    res.status(200).json({ message: "Comment Succesfully added" })
  },
  get: async (req, res) => {

    const findBoard = await Board.findOne({ where: { id } });
    // await findBoard.addComment(req.userId)
    await findBoard.addComment(req.userId, {
      through: {
        comment: comment,
      },
    });


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
    // 첫 번 게시글의 첫 번째 댓글 내용 수정
    const { id } = req.params
    const { commentId, comment } = req.body 

    const commentUpdated = await db.sequelize.models.Comment.update({
      comment: comment,
    }, {
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: id,
      }
    })

    // console.log(commentUpdated)

    res.status(200).json({ message: "Comment Succesfully modified" })
  },
  remove: async (req, res) => {

    // // 두번째 게시글의 첫 번째 댓글 내용 삭제
    // const { id } = req.params
    // const { commentId, comment } = req.body 

    // const deleteUpdated = await db.sequelize.models.Comment.destroy({
    //   comment: comment,
    // }, {
    //   where: {
    //     id: commentId,
    //     UserId: req.userId,
    //     BoardId: id,
    //   }
    // })

    // console.log(deleteUpdated)

    // res.status(200).json({ message: "Comment Succesfully deleted" })

    // 두번째 게시글의 첫 번째 댓글 내용 삭제
    res.status(200)

    res.status(200).json({});

  },
};
