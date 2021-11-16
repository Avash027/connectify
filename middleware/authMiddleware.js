const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).send("Unathorized");
    }

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );

    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).send("Unathorized");
  }
};
