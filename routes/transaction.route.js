const {
  createTransaction,
  getUserTransactions,
  getTransactionDetails,
  updateTransactionStatus,
} = require("../controllers/transaction.controller");
const router = require("../helpers/router");

const authentication = require("../middlewares/authentication");
const { buyerAuthorization } = require("../middlewares/authorization");

router.use(authentication);
router.post("/transaction/create", buyerAuthorization, createTransaction);
router.get("/transactions/user", buyerAuthorization, getUserTransactions);
router.get("/transaction/:id", buyerAuthorization, getTransactionDetails);

module.exports = router;
