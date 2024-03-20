const espress = require("express");
const router = espress.Router();
const user = require("../controllers/userController");

// CRUD USEER
router.post("/user", user.usercreate);
router.get("/user/:id", user.userget);
router.get("/users", user.usergets);
router.put("/user/:id", user.userput);
router.delete("/user/:id", user.userdelete);
// FIN CRUD USER

module.exports = router;
