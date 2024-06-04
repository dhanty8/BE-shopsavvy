const router = require("../helpers/router");

const {
  register,
  deleteUser,
  getUser,
  signIn,
  updateUser,
} = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");

router.post("/register", register);
router.post("/signin", signIn);
router.get("/:id", authentication, getUser);
router.put("/update/:id", authentication, updateUser);
router.delete("/delete/:id", authentication, deleteUser);

module.exports = router;
