// point d'entrée d'pplication
const express = require("express");
const cors = require("cors"); // pour la sécurité
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./router/userRoute.js"); // pour le user
require("./db/connect_bdd.js"); // import bdd
const carRoute = require("./router/carRoute.js"); // pour le car
const serviceRoute = require("./router/serviceRoute.js"); // pour le service
const contactRoute = require("./router/contactRoute.js"); // pour le contact
const testimonialRoute = require("./router/testimonialRoute.js"); // pour le commentaire
const scheduleRoute = require("./router/scheduleRoute.js"); // pour le commentaire
const equipementRoute = require("./router/equipementOptionRoute.js") // pour option équipement
const characteristicRoute = require("./router/characteristicRoute.js") // pour option équipement
const path = require("path");
const fs = require("fs");
// on permet au server d'accepter les fichiers json
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Autorise les requêtes provenant de ce domaine entre front et back
  credentials: true, // Indiquez que les cookies et les en-têtes d'authentification peuvent être inclus
  optionsSuccessStatus: 200, // some legacy browsers
  methods: "GET,PUT,OPTIONS,POST,DELETE", // methodes accepter
  // le serveur ne doit pas continuer à traiter la requête après avoir reçu une requête de pré-vérification (pré-vol).
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // limite megabite
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "public", "images/"))); // expose fichier


// app.use(express.urlencoded({ extended: false })); //exposé image fichier statique
// app.use("/image", express.static(path.join(__dirname, "public", "images")));// exposé image fichier statique

// pour le user
app.use("/api", userRoute);
//pour le car
app.use("/api", carRoute);
//pour le service
app.use("/api", serviceRoute);
//pour le contact
app.use("/api", contactRoute);
//pour le commentaire
app.use("/api", testimonialRoute);
//pour l'horaire
app.use("/api", scheduleRoute);
//pour equipement option
app.use("/api", equipementRoute);

app.use("/api", characteristicRoute);

// Démarrage du serveur
const port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
