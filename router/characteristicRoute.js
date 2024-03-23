const espress = require("express");
const router = espress.Router();
const characteristic = require("../controllers/characteristicController.js");

// CRUD CHARACTERISTIC
router.post("/characteristic",characteristic.characteristicCreate);
router.get("/characteristic/:id" ,characteristic.characteristicGet);
router.get("/characteristics" ,characteristic.characteristicGets);
router.put("/characteristic/:id" ,characteristic.characteristicPut);
router.delete("/characteristic/:id" ,characteristic.characteristicDelete);
// FIN CRUD CHARACTERISc
module.exports = router