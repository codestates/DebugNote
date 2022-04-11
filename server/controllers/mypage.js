const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = {
  get: async (req, res) => {
    if (!req.userId) {
      return res.status(401).json({ message: '해당 유저 id가 없습니다.' });
    }

    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    const { id, email, name, nickname, job } = user;

    if (!user) {
      return res.status(401).json({ message: '해당 유저가 없습니다.' });
    }

    return res.status(200).json({
      user: {
        id,
        email,
        name,
        nickname,
        job,
      },
      message: '회원 정보를 가져왔습니다.',
    });
  },
  put: async (req, res) => {
    const { email, nickname, name, job, password } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: '해당 유저 id가 없습니다.' });
    }

    const hashedPassword = await bcrypt
      .hash(password, config.bcrypt.saltRounds)
      .catch(err => console.log(err));

    const updateUser = await User.update(
      {
        email,
        nickname,
        name,
        job,
        password: hashedPassword,
      },
      {
        where: {
          id: req.userId,
        },
      },
    );

    return res
      .status(200)
      .json({ updateUser, message: '회원 정보를 수정하였습니다.' });
  },
};
