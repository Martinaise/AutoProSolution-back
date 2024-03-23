const espress = require("express");
const router = espress.Router();
const service = require("../controllers/serviceController.js");
const upload = require("../middlewares/middlewaresUploadImage.js"); // pour recup image 

// CRUD SERVICE
router.post("/service",upload,service.servicecreate);
router.get("/service/:id", service.serviceget);
router.get("/service", service.servicegets);
router.put("/service/:id",upload, service.serviceput);
router.delete("/service/:id", service.servicedelete);
// FIN CRUD SERVICE
module.exports = router;
