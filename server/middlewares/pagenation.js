const Board = require('../models/board');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  searchBoard: async option => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        content: {
          [Op.like]: '%' + option + '%', // 유사 검색
        },
      },
    });
  },
  getBoards: async (page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      limit: Number(limit),
      offset: (page - 1) * 10, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
};
