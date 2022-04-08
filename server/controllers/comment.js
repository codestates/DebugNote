const Board = require('../models/board');
const User = require('../models/user');

module.exports = {
  post: async (req, res) => {
    // id: 게시글 PK
    const { id } = req.params;
    const { comment } = req.body;


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

    const findBoard = await Board.findOne({ where: { id } })
    // console.log(findBoard)

    await findBoard.setComment(req.userId, {
      through: {
        comment: comment
      }
    })

    res.status(200).json({})
  },
  remove: async (req, res) => {
    // 두번째 게시글의 첫 번째 댓글 내용 삭제
    res.status(200)

    res.status(200).json({});
  },
};
