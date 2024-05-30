const router = require("../helpers/router");

const {
  register,
  deleteUser,
  getUser,
} = require("../controllers/user.controller");

router.post("/register", register);
router.get("/:id", getUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
