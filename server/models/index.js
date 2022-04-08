const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
// console.log(config)
const User = require('./user');
<<<<<<< HEAD
const Board = require('./Board');
=======
const Board = require('./board');

>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;

<<<<<<< HEAD
User.init(sequelize);
Board.init(sequelize);

User.associate(db);
Board.associate(db);

=======

User.init(sequelize);
Board.init(sequelize);

Board.comment = sequelize.define('comment', {
  comment: Sequelize.STRING(50)
})
User.associate(db);
Board.associate(db);




>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8
module.exports = db;
