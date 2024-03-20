const espress = require("express");
const router = espress.Router();
const car = require("../controllers/carController.js");

// CRUD CAR
router.post("/car", car.carcreate);
router.get("/car/:id", car.carget);
router.get("/cars", car.cargets);
router.put("/car/:id", car.carput);
router.delete("/car/:id", car.cardelete);
// FIN CRUD CAR

module.exports = router;
