const Board = require('../models/board');
const db = require('../models');

module.exports = {
  post: async (req, res) => {
    const { title, content } = req.body;

    await Board.create({
      title,
      content,
      UserId: req.userId,
      picture: 'dummy',
    });

    res.status(203).json({ message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: 'param이 없습니다.' });
    }

    const board = await Board.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.sequelize.models.Comment,
          attributes: ['id', 'comment', 'createdAt'],
        },
      ],
      order: [[db.sequelize.models.Comment, 'createdAt', 'desc']],
    });

    if (board.length === 0) {
      return res
        .status(404)
        .json({ messgae: '해당 게시물이 존재하지 않습니다.' });
    }

    return res.status(201).json({ board, message: '게시물을 가져왔습니다.' });
  },
  // 게시글 수정
  put: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const findBoard = await Board.findByPk(id);

    if (!findBoard)
      return res
        .status(400)
        .json({ message: '해당 게시물이 존재하지 않습니다' });

    await Board.update(
      {
        title,
        content,
      },
      {
        where: {
          id,
        },
      },
    );

    res.status(200).json({ message: '게시물이 수정 되었습니다' });
  },
  // 게시글 삭제
  remove: async (req, res) => {
    const { id } = req.params;

    const findBoard = await Board.findByPk(id);

    if (!findBoard)
      return res
        .status(400)
        .json({ message: '해당 게시물이 존재하지 않습니다' });

    await Board.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: '게시물이 삭제 되었습니다' });
  },
};
