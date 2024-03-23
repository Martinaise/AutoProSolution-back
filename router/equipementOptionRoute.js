const espress = require("express");
const router = espress.Router();
const equipement = require("../controllers/equipementOptionController");

// CRUD EQUIPEMENT
router.post("/equipement", equipement.equipementOptionCreate);
router.get("/equipement/:id",equipement.equipementOptionGet);
router.get("/equipements",equipement.equipementOptiongets);
router.put("/equipement/:id",equipement.equipementOptionPut);
router.delete("/equipement/:id",equipement.equipementOptionDelete);
// FIN CRUD EQUIPEMENT

module.exports = router