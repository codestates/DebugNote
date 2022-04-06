const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  jwt: {
    secret_key: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
};