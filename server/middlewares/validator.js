const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const error = validationResult(req);
  console.log(error.array()[0]);
  if (!error.isEmpty()) {
    return res
      .status(401)
      .json({ message: `${error.array()[0].param}이 잘못 되었습니다.` });
  }

  next();
};
