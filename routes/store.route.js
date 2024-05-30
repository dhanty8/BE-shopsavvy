const router = require("../helpers/router");

const { createStore, deleteStore } = require("../controllers/store.controller");

router.post("/create", createStore);
router.delete("/deletes-store/:id", deleteStore);

module.exports = router;
