const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controller");
const router = require("../helpers/router");

const authentication = require("../middlewares/authentication");
const { sellerAuthorization } = require("../middlewares/authorization");

router.use(authentication);
router.get("/product/all", getProducts);
router.get("/product/:id", getProduct);
router.post("/product/create", sellerAuthorization, createProduct);
router.delete("/product/delete/:id", sellerAuthorization, deleteProduct);

module.exports = router;
