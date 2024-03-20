const espress = require("express");
const router = espress.Router();
const testimonial = require("../controllers/testimonialController.js");

// CRUD COMMENTAIRE
router.post("/testimonial", testimonial.testimonialcreate);
router.get("/testimonial/:id", testimonial.testimonialget);
router.get("/testimonials", testimonial.testimonialgets);
router.put("/testimonial/:id",testimonial.testimonialput);
router.delete("/testimonial/:id", testimonial.testimonialdelete);
// FIN CRUD COMMENTAIRE

module.exports = router;
