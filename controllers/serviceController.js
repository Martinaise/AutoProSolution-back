const { query } = require("express");
const db = require("../db/connect_bdd");
//  DÉBUT CREATION SERVICE

module.exports.servicecreate = async (req, res) => {
  const {
    service_name,
    description,
    picture,
    
  } = req.body;
  if (
    !service_name||
    !description ||
    !picture  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Service (service_name, description, picture 
    ) VALUES (?, ?, ?)`;
  const values = [
    service_name, 
    description,
     picture,

  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le service a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du service ",
      error: error,
    });
  }
};
//  FIN  CREATION SERVICE

//  DÉBUT RECUPERATION  DE TOUS  SERVICES
module.exports.servicegets = async (req, res) => {
  const query = "SELECT * FROM Service";
  try {
    const services = await db.executeQuery(query);
    res.status(201).json({
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des services",
      error: error,
    });
  }
};
// FIN  RECUPERATION  DE TOUS LES SERVICE

//  DÉBUT RECUPERATION D'UN SERVICE
module.exports.serviceget = async (req, res) => {
  const query = ` SELECT * FROM Car WHERE id_service = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const service = await db.executeQuery(query, value);
    res.status(201).json({
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des services",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  D'UN SERVICE 

// DÉBUT MODIFICATION SERVICE
module.exports.serviceput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const {
    service_name,
     description,
      picture,
  } = req.body; // Récupérer les nouvelles données de service depuis le corps de la requête

  // Vérifier si les nouvelles données de service sont fournies
  if (
    !service_name||
    !description ||
    !picture 
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification de service.",
    });
  }

  const updateQuery = `UPDATE Service 
                         SET service_name = ?, description = ?, picture = ?
                         WHERE id_service = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    service_name,
     description,
      picture,
    id, // Utiliser l'ID de service pour identifier l'enregistrement à mettre à jour
  ];
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations du service  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification des informations du service.",
      error: error,
    });
  }
};

// FIN  MODIFICATION DES SERVICES

//   DÉBUT SUPPRESSION SERVICES

module.exports.servicedelete = async (req, res) => {
  const query = ` DELETE FROM Service  WHERE id_service =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `service supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du service",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION  SERVICES
