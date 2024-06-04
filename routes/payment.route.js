const { processPayment } = require("../controllers/payment.controller");
const router = require("../helpers/router");

const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/payment/process", processPayment);

module.exports = router;
