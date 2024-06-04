const router = require("../helpers/router");

const {
  createStore,
  deleteStore,
  getStore,
} = require("../controllers/store.controller");
const {
  sellerAuthorization,
  buyerAuthorization,
} = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/store/:id", buyerAuthorization, getStore);
router.post("/store/create", sellerAuthorization, createStore);
router.delete("/store/delete/:id", sellerAuthorization, deleteStore);

module.exports = router;
