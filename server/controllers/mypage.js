const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = {
  get: async (req, res) => {
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

    const userFind = await User.findByPk(req.userId);

    if (!userFind) {
      return res.status(400).json({ message: '유저가 존재 하지 않습니다.' });
    }

    // 기존 비밀번호 확인 절차, 협의 필요
    //   const isValidPassword = await bcrypt
    //   .compare(originPassword, userFind.password)
    //   .catch(err => console.log(err));

    //   if (!isValidPassword) {
    //     return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    //   }

    // 유저 정보 업데이트
    const hashedPassword = await bcrypt
      .hash(password, config.bcrypt.saltRounds)
      .catch(err => console.log(err));

    await User.update(
      {
        email,
        password: hashedPassword,
        nickname,
        name,
        job,
      },
      {
        where: { id: req.userId },
      },
    );

    res.status(200).json({ message: '유저 정보가 수정되었습니다.' });
  },
};
