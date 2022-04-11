const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({ message: error.array() });
  }

  next();
};
