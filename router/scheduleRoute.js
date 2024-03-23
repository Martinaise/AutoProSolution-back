const espress = require("express");
const router = espress.Router();
const schedule = require("../controllers/scheduleController");

// CRUD CONTACT
router.post("/schedule", schedule.schedulecreate);
router.get("/schedule/:id", schedule.scheduleget);
router.get("/schedules", schedule.schedulegets);
router.put("/schedule/:id", schedule.scheduleput);
router.delete("/schedule/:id", schedule.scheduledelete);
// FIN CRUD CONTACT

module.exports = router;
