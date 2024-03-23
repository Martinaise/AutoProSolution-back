const db = require("../db/connect_bdd");
//  DÉBUT CREATION

module.exports.equipementOptionCreate = async (req, res) => {
  const {
    option_name
  } = req.body;

  if (
    !option_name 
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Equipment_Option (option_name) VALUES (?)`;
  const values = [
    option_name
  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "l'équipent  a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création d'un équipement ",
      error: error,
    });
  }
};
//  FIN  CREATION

//  DÉBUT RECUPERATION   DE TOUS LES EQUIPEMENT
module.exports.equipementOptiongets = async (req, res) => {
  const query = "SELECT * FROM Equipment_Option";
  try {
    const equipments = await db.executeQuery(query);
    res.status(201).json({
        equipments,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des équipements",
      error: error,
    });
  }
};
// FIN  RECUPERATION DE TOUS LES EQUIPEMENT

//  DÉBUT RECUPERATION  D'UN EQUIPEMENT
module.exports.equipementOptionGet = async (req, res) => {
  const query = ` SELECT * FROM Equipment_Option WHERE id_equipment_option = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const equipments = await db.executeQuery(query, value);
    res.status(201).json({
        equipments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des user",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  D'UN EQUIPEMENT

// DÉBUT MODIFICATION  EQUIPEMENT
module.exports.equipementOptionPut = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const {
    option_name
  } = req.body; // Récupérer les nouvelles données de l'équipmentdepuis le corps de la requête

  // Vérifier si les nouvelles données de l'équipment  sont fournies
  if (
    !option_name 
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification de car.",
    });
  }

  const updateQuery = `UPDATE Equipment_Option 
                         SET option_name = ?
                         WHERE id_equipment_option = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    option_name,
    id, // Utiliser l'ID de l'équipement pour identifier l'enregistrement à mettre à jour
  ];
  console.log(id);
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations de l'équipement  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification des informations de  l'équipement.",
      error: error,
    });
  }
};

// FIN  MODIFICATION D'UN EQUIPEMENT

//   DÉBUT SUPPRESSION D'UN EQUIPEMENT

module.exports.equipementOptionDelete = async (req, res) => {
  const query = ` DELETE FROM Equipment_Option  WHERE id_equipment_option =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `équipement supprimé ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression d'un équipement",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION D'UN EQUIPEMENT
