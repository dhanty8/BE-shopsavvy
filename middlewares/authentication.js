// Pacakages
const jwt = require("jsonwebtoken");
// Models
const { User } = require("../models");
// Helpers
const statusMessage = require("../helpers/status.message");
// ENV
const secretKey = process.env.SECRET_KEY;

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, secretKey);

      const user = await User.findByPk(decoded.id);

      if (user) {
        req.decoded = user;
        next();
      } else {
        statusMessage(res, 401, false, "Unauthenticated user!");
      }
    } else {
      statusMessage(res, 401, false, "Invalid token");
    }
  } catch (error) {
    statusMessage(res, 401, false, error.message);
  }
};

module.exports = authentication;
