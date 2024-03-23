const espress = require("express");
const router = espress.Router();
const user = require("../controllers/userController");
const authentification = require("../controllers/authentification") // pour authentifier  le user
const middlewareAmin = require("../middlewares/middlewaresAdmin")
const middlewareToken= require("../middlewares/middlewaresToken")

// CRUD USEER
router.post("/user", middlewareToken.checkAuth,middlewareAmin.checkAdmin, user.usercreate);
router.get("/user/:id", user.userget);
router.get("/users", user.usergets);
router.put("/user/:id", user.userput);
router.delete("/user/:id", user.userdelete);
router.post("/login", authentification.login);
// FIN CRUD USER

module.exports = router;

// checkAuth pour admin et employé 
// checkAuth et checkAdmin que pour admin 