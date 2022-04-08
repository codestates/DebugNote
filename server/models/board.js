const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        picture: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Board',
        tableName: 'boards',
        paranoid: false,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }


  static associate(db) {
    db.Board.belongsTo(db.User);
    
    db.Board.belongsToMany(db.User, {
      as: 'Comment',
      through: 'comment',
    });
    db.User.belongsToMany(db.Board, {
        through: 'bookmark',
      });
  }
};
