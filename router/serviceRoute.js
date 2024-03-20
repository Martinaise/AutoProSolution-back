const espress = require("express");
const router = espress.Router();
const service = require("../controllers/serviceController.js");

// CRUD SERVICE
router.post("/service", service.servicecreate);
router.get("/service/:id", service.serviceget);
router.get("/service", service.servicegets);
router.put("/service/:id", service.serviceput);
router.delete("/service/:id", service.servicedelete);
// FIN CRUD SERVICE
module.exports = router;
