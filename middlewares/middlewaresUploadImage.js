const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Définissez le chemin du dossier public
const publicDir = path.join("./public"); // Remplacez 'public' par le chemin souhaité

// Vérifiez si le dossier public existe, sinon créez-le
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Fonction pour obtenir le chemin de destination en fonction de la route
function getDestination(req, file, cb) {
  let route = req.route.path; // Obtenez la route à partir de la demande
  console.log("route",req.route.path)
  route = route.replace(/\/|:id/g, ""); // Remplacez les barres obliques par des tirets pour éviter les problèmes de chemin
  const destination = path.join(publicDir, "images", route); // Créez le chemin de destination en fonction de la route
  cb(null, destination);
}

const storage = multer.diskStorage({
  destination: getDestination,
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Utilisez multer.array() au lieu de multer.single()
const upload = multer({ storage: storage }).array("pictures"); // 'pictures' est le nom du champ de formulaire pour le tableau d'images
module.exports = upload;