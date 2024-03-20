//  connection à la bdd on utilise
//  dotenv pour sécuriser  les variables d'environnement quand on envois  le site à  distance.
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
//    pour acceder au donné
//   Un socket est un point de communication bidirectionnel entre deux processus. Dans le  MySQL, le socket est utilisé pour la communication entre le client MySQL application ou un outil d'administration) et le serveur MySQL
//   pour trouver mon chemin sur le terminal mysql_config --socket puis on a /tmp/mysql.sock
// on rajoute  applications MAMP
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

// pour avoir une réponse si connection à reussit ou non
// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : " + err.stack);
    return;
  }
  console.log("Connecté à la base de données");
});

// Fonction pour exécuter une requête SQL on utilise dans  le controller
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { executeQuery };
