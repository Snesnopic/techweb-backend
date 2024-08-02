const { v4: uuidv4 } = require("uuid");

const sessionMiddleware = (req, res, next) => {
  if (!req.user) {
    if (!req.sessionId) {
      req.sessionId = uuidv4();
    }
  }
  next();
};

module.exports = sessionMiddleware;
