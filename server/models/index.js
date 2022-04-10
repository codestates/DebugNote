const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Board = require('./board');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;

User.init(sequelize);
Board.init(sequelize);

<<<<<<< HEAD
// Comment.associate()
=======
>>>>>>> 9da0f7f6d22519ee77fd3af19b58702a562937a4
const comment = sequelize.define(
  'Comment',
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
User.hasMany(comment);
Board.hasMany(comment);

User.associate(db);
Board.associate(db);

module.exports = db;
