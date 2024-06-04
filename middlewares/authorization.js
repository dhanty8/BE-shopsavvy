// Helpers
const statusMessage = require("../helpers/status.message");

const sellerAuthorization = async (req, res, next) => {
  try {
    const user = req.decoded;

    if (user.role === "SELLER") {
      next();
    } else {
      statusMessage(res, 401, false, "Unauthorized user!");
    }
  } catch (error) {
    statusMessage(res, 401, false, error.message);
  }
};

const buyerAuthorization = async (req, res, next) => {
  try {
    const user = req.decoded;

    if (user.role === "BUYER") {
      next();
    } else {
      statusMessage(res, 401, false, "Unauthorized user!");
    }
  } catch (error) {
    statusMessage(res, 401, false, error.message);
  }
};

module.exports = { sellerAuthorization, buyerAuthorization };
