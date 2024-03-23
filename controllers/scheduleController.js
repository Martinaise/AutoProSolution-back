const db = require("../db/connect_bdd");
const moment = require("moment"); // Importez la bibliothèque moment.js pour manipuler les heures
//  DÉBUT CREATION HORAIRE

module.exports.schedulecreate = async (req, res) => {
  let {
    day,
    morning_opening_time,
    morning_closing_time,
    afternoon_opening_time,
    afternoon_closing_time,
    is_open,
    is_on_break,
  } = req.body;
  console.log(req.body);
  if (
    !day ||
    !morning_opening_time ||
    !morning_closing_time ||
    !afternoon_opening_time ||
    !afternoon_closing_time
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }
  if (is_open == undefined) {
    is_open = true;
  }
  if (is_on_break == undefined) {
    is_on_break = false;
  }
  // Convertir les heures en objets de date et les formater
  morning_opening_time = moment(morning_opening_time, "HH:mm").format(
    "HH:mm:ss"
  );
  morning_closing_time = moment(morning_closing_time, "HH:mm").format(
    "HH:mm:ss"
  );
  afternoon_opening_time = moment(afternoon_opening_time, "HH:mm").format(
    "HH:mm:ss"
  );
  afternoon_closing_time = moment(afternoon_closing_time, "HH:mm").format(
    "HH:mm:ss"
  );
  const createExecuteQuery = `INSERT INTO Schedule (
    day,
    morning_opening_time ,
    morning_closing_time ,
    afternoon_opening_time,
    afternoon_closing_time,
    is_open,
    is_on_break
    ) VALUES (?, ?, ?,?, ?, ? , ?)`;
  const values = [
    day,
    morning_opening_time,
    morning_closing_time,
    afternoon_opening_time,
    afternoon_closing_time,
    is_open,
    is_on_break,
  ];

  console.log(new Date(morning_opening_time));
  new Date().getTime();
  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "l'horaire a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de l'horaire ",
      error: error,
    });
  }
};
//  FIN  CREATION HORAIRE

//  DÉBUT RECUPERATION  DE TOUS  LES HORAIRES
module.exports.schedulegets = async (req, res) => {
  const query = "SELECT * FROM 	Schedule";
  try {
    const schedules = await db.executeQuery(query);
    res.status(201).json({
      schedules,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des horaires",
      error: error,
    });
  }
};
// FIN  RECUPERATION  DE TOUS LES HORAIRES

//  DÉBUT RECUPERATION D'UNE HORAIRE
module.exports.scheduleget = async (req, res) => {
  const query = ` SELECT * FROM Schedule WHERE id_schedule = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const schedule = await db.executeQuery(query, value);
    res.status(201).json({
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération de l'horaire",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  D'UNE HORAIRE

// DÉBUT MODIFICATION HORAIRE
module.exports.scheduleput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  let {
    day,
    morning_opening_time,
    morning_closing_time,
    afternoon_opening_time,
    afternoon_closing_time,
    is_open,
    is_on_break,
  } = req.body; // Récupérer les nouvelles données de service depuis le corps de la requête

  // Vérifier si les nouvelles données de service sont fournies
  if (
    !day ||
    !morning_opening_time ||
    !morning_closing_time ||
    !afternoon_opening_time ||
    !afternoon_closing_time
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification de  l'horaire.",
    });
  }
  morning_opening_time = moment(morning_opening_time, "HH:mm").format(
    "HH:mm:ss"
  );
  morning_closing_time = moment(morning_closing_time, "HH:mm").format(
    "HH:mm:ss"
  );
  afternoon_opening_time = moment(afternoon_opening_time, "HH:mm").format(
    "HH:mm:ss"
  );
  afternoon_closing_time = moment(afternoon_closing_time, "HH:mm").format(
    "HH:mm:ss"
  );
  const updateQuery = `UPDATE Schedule
                         SET day =?, morning_opening_time = ?, morning_closing_time = ? , afternoon_opening_time = ?  , afternoon_closing_time = ? , is_open = ? , is_on_break = ? 
                         WHERE id_schedule = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    day,
    morning_opening_time,
    morning_closing_time,
    afternoon_opening_time,
    afternoon_closing_time,
    is_open,
    is_on_break,
    id, // Utiliser l'ID de service pour identifier l'enregistrement à mettre à jour
  ];
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations du  l'horaire  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la modification de lhoraire",
      error: error,
    });
  }
};

// FIN  MODIFICATION  HORAIRE

//   DÉBUT SUPPRESSION HORAIRE

module.exports.scheduledelete = async (req, res) => {
  const query = ` DELETE FROM  Schedule WHERE id_schedule = ? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `horaire  supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de l'horaire",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION  HORAIRE
