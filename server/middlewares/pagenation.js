const Board = require('../models/board');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const db = require('../models');
const User = require('../models/user');
module.exports = {
  // 검색 페이지
  searchTitle: async (option, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        title: {
          [Op.like]: '%' + option + '%', // 유사 검색
        },
      },
      limit: Number(limit),
      offset: (page - 1) * 10,
    });
  },
  searchContent: async (option, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        content: {
          [Op.like]: '%' + option + '%', // 유사 검색
        },
      },
      limit: Number(limit),
      offset: (page - 1) * 10,
    });
  },
  // 메인 페이지
  getBoards: async (page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      limit: Number(limit),
      offset: (page - 1) * 10, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  // 내가 쓴 글 조회
  myBoards: async (userId, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        UserId: userId,
      },
      limit: Number(limit),
      offset: (page - 1) * 10, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },

  // 내가 북마크 한 글
  myBookmarks: async (userId, page, limit) => {
    return await User.findAndCountAll({
      attributes: ['id'],
      where: {
        id: userId,
      },
      // join 문
      include: [
        {
          model: Board,
          through: {
            attributes: ['createdAt'],
          },
          // order: [[db.sequelize.models.Bookmark, 'createdAt', 'desc']],
        },
      ],
      limit: Number(limit), // 한 페이지에 몇개를 보여줄 것인가
      // 시작점 1페이지 = 0 / 2페이지  = 10 / 3페이지 = 20
      offset: (page - 1) * 10,
      subQuery: false,
    });
  },
};
