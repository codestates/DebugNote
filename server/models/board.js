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
<<<<<<< HEAD
        totalComment: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        totalBookmark: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
=======
>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8
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
<<<<<<< HEAD
  static associate(db) {
    db.Board.belongsTo(db.User);
    db.Board.belongsToMany(db.User, {
=======


  static associate(db) {
    db.Board.belongsTo(db.User);
    
    db.Board.belongsToMany(db.User, {
      as: 'Comment',
>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8
      through: 'comment',
    });
    db.User.belongsToMany(db.Board, {
        through: 'bookmark',
      });
  }
};
