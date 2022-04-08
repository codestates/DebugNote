const Board = require('../models/board');
const User = require('../models/user');
  
module.exports = {
  post: async (req, res) => {
    // id: 게시글 PK
    const { id } = req.params;
    const { comment } = req.body;

    const findBoard = await Board.findOne({ where: { id } })
    // await findBoard.addComment(req.userId)
    await findBoard.addComment(req.userId, {
      through: {
        comment: comment
      }
    })

    // const result = await User.findOne({
    //   where: { id: req.userId },
    //   include: {
    //     model: Board,
    //     attributes: ['comment'],
    //   }
    // })

    res.status(200).json({ })
  },
  get: async (req, res) => {},
  put: async (req, res) => {},
  remove: async (req, res) => {},
};
