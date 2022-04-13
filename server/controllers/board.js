const db = require('../models');
const Board  = require('../models/board');
const Comment  = require('../models/comment');
const User = require('../models/user');
const Sequelize = require('sequelize');
const SequelModel = Sequelize.Sequelize;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    const { title, content } = req.body;

   const board = await Board.create({
      title,
      content,
      UserId: req.userId,
      picture: 'dummy',
    });

    res.status(203).json({ boardId: board.id, message: '게시물 생성 되었습니다.' });
  },
  get: async (req, res) => {
    const { id } = req.params;

    const board = await Board.findOne({
      where: {
        id: id,
      },
      attributes: ['id', [SequelModel.col('User.nickname'), 'nickname'], 'title', 'content', 'picture', 'createdAt', 'updatedAt', 'userId' ],
      include: [{
          model: User,
          attributes: [],
        }]
      })

    const comment = await Comment.findAll({
        where: {
          BoardId: id
        },
        attributes:['id','comment','createdAt','updatedAt', [SequelModel.col('User.nickname'), 'nickname']],
        include: [
          {
            model: User,
            attributes: []
          }
        ]
      })
    
    // 유저의 해당 게시글 북마크 정보 내려주기 (로그인 안한 사람은 [])
    let bookmark;
    let token;
    // 토큰이 헤더로 전달되었을 때
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  
    // 토큰이 쿠키로 전달되었을 때
    if (!token) {
      token = req.cookies['token'];
    }

    //로그인한 유저일 때
    if ( token ) {
    // 유저 PK
      const user = jwt.verify(token, process.env.JWT_SECRET);
      bookmark = await db.sequelize.models.Bookmark.findOne({
        where: {
          UserId: user.id,
          BoardId: id
        }
      })
      // console.log(typeof bookmark)
      console.log(bookmark)
      // console.log(bookmark.filter((index) => index.BoardId = id))
    }
    // 유저가 북마크 안했으면 

    if (board.length === 0) {
      return res
        .status(404)
        .json({ message: '해당 게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json({ board, comment, bookmark, message: '게시물을 가져왔습니다.' });
  },
  // 게시글 수정
  put: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const findBoard = await Board.findByPk(id);

    if (findBoard.UserId != req.userId) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

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

    if (findBoard.UserId != req.userId) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

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
