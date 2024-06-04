const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const router = require("../helpers/router");

const authentication = require("../middlewares/authentication");
const { buyerAuthorization } = require("../middlewares/authorization");

router.use(authentication);
router.post("/cart/add", buyerAuthorization, addToCart);
router.get("/cart/user", buyerAuthorization, getCart);
router.delete("/cart/remove", buyerAuthorization, removeFromCart);

module.exports = router;
