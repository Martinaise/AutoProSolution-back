const db = require("../db/connect_bdd");
//  DÉBUT CREATION CARACTERISTIQUE

module.exports.characteristicCreate = async (req, res) => {
  const {
    characteristic_name
  } = req.body;

  if (
    !characteristic_name
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Characteristic (characteristic_name) VALUES (?)`;
  const values = [
    characteristic_name
  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le charactéristique  a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de car ",
      error: error,
    });
  }
};
//  FIN  CREATION CARACTERISTIQUE

//  DÉBUT RECUPERATION  CARACTERISTIQUES
module.exports.characteristicGets = async (req, res) => {
  const query = "SELECT * FROM Characteristic";
  try {
    const characteristics = await db.executeQuery(query);
    res.status(201).json({
      characteristics,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des caracteristique",
      error: error,
    });
  }
};
// FIN  RECUPERATION CARACTERISTIQUES

//  DÉBUT RECUPERATION  CARACTERISTIQUE
module.exports.characteristicGet = async (req, res) => {
  const query = ` SELECT * FROM Characteristic WHERE id_characteristic = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const characteristics = await db.executeQuery(query, value);
    res.status(201).json({
      characteristics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des caractéristiques",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  CARACTERISTIQUE

// DÉBUT MODIFICATION CARACTERISTIQUE
module.exports.characteristicPut = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const {
    characteristic_name
  } = req.body; // Récupérer les nouvelles données de caractéristique depuis le corps de la requête

  // Vérifier si les nouvelles données de  caractéristique sont fournies
  if (
    !characteristic_name
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification de carastéristique.",
    });
  }

  const updateQuery = `UPDATE Characteristic 
                         SET characteristic_name = ?
                         WHERE id_characteristic = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    characteristic_name,
    id // Utiliser l'ID de l'utilisateur pour identifier l'enregistrement à mettre à jour
  ];
  console.log(id);
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations de car  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification des informations de car.",
      error: error,
    });
  }
};

// FIN  MODIFICATION CAR

//   DÉBUT SUPPRESSION CAR

module.exports.characteristicDelete = async (req, res) => {
  const query = ` DELETE FROM Characteristic WHERE id_characteristic =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `car supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de car",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION CAR
