const espress = require("express");
const router = espress.Router();
const contact = require("../controllers/contactController.js");

// CRUD CONTACT
router.post("/contact", contact.contactcreate);
router.get("/contact/:id",contact.contactget);
router.get("/contacts",contact.contactgets);
router.put("/contact/:id",contact.contactput);
router.delete("/contact/:id",contact.contactdelete);
// FIN CRUD CONTACT

module.exports = router