const Board = require('../models/board');
const User = require('../models/user');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    const searchType = req.query.search_type;
    const { titles, contents } = req.query;

    if (searchType === 'titles') {
      if (!titles) {
        return res.status(400).json({ message: '제목을 입력 해주세요.' });
      }

      const findBoard = await Board.findAll({
        where: {
          order: [['id', 'desc']],
          title: {
            [Op.like]: '%' + titles + '%', // 유사 검색
          },
        },
      });

      if (findBoard.length === 0) {
        return res
          .status(404)
          .json({ message: '검색 결과 게시물이 없습니다.' });
      }

      return res
        .status(201)
        .json({ findBoard, message: '제목 검색에 성공 했습니다.' });
    }

    if (searchType === 'contents') {
      if (!contents) {
        return res.status(400).json({ message: '본문을 입력 해주세요.' });
      }
      const findBoard = await Board.findAll({
        order: [['id', 'desc']],
        where: {
          content: {
            [Op.like]: '%' + contents + '%', // 유사 검색
          },
        },
      });

      if (findBoard.length === 0) {
        return res
          .status(404)
          .json({ message: '검색 결과 게시물이 없습니다.' });
      }

      return res
        .status(201)
        .json({ findBoard, message: '본문 내용 검색에 성공 했습니다.' });
    }
  },
};
