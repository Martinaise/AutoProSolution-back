// point d'entrée d'pplication
const express = require("express");
const app = express();
const userRoute = require("./router/userRoute.js"); // pour le user
require("./db/connect_bdd.js"); // import bdd
const carRoute =  require("./router/carRoute.js"); // pour le car 
const serviceRoute = require("./router/serviceRoute.js"); // pour le service
const contactRoute = require("./router/contactRoute.js")// pour le contact
const testimonialRoute = require("./router/testimonialRoute.js")// pour le commentaire

// on permet au server d'accepter les fichiers json
app.use(express.json());

// pour le user
app.use("/api", userRoute);
//pour le car 
app.use("/api", carRoute);
//pour le service
app.use("/api", serviceRoute);
//pour le contact
app.use("/api",contactRoute);
//pour le commentaire
app.use("/api",testimonialRoute);

// Démarrage du serveur
const port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
