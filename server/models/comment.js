const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Comment',
        tableName: 'comments',
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { onDelete: 'cascade' });
    db.Comment.belongsTo(db.Board, { onDelete: 'cascade' });
  }
};
