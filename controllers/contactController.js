const { query } = require("express");
const db = require("../db/connect_bdd");

//  DÉBUT CREATION CONTACT
module.exports.contactcreate = async (req, res) => {
  const { first_name, last_name, email, phone_number, message, subject } =
    req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !message ||
    !subject
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Contact ( 
first_name,
last_name,
email,
phone_number,
message,
subject,
  contact_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    first_name,
    last_name,
    email,
    phone_number,
    message,
    subject,
    new Date(), // on prnd la date du jour
  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le  conatct a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du contact ",
      error: error,
    });
  }
};
//  FIN  CREATION CONTACT

//  DÉBUT RECUPERATION  DE TOUS  LES CONTACT
module.exports.contactgets = async (req, res) => {
  const query = "SELECT * FROM Contact";
  try {
    const contacts = await db.executeQuery(query);
    res.status(201).json({
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des contacts",
      error: error,
    });
  }
};
// FIN  RECUPERATION  DE TOUS LES CONTACTS

//  DÉBUT RECUPERATION D'UN CONTACT
module.exports.contactget = async (req, res) => {
  const query = ` SELECT * FROM Contact WHERE id_contact = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const contact = await db.executeQuery(query, value);
    res.status(201).json({
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du contact",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  D'UN CONTACT

// DÉBUT MODIFICATION CONTACT
module.exports.contactput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const { first_name, last_name, email, phone_number, message, subject } =
    req.body; // Récupérer les nouvelles données du contact depuis le corps de la requête

  // Vérifier si les nouvelles données de service sont fournies
  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !message ||
    !subject
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification du contact.",
    });
  }

  const updateQuery = `UPDATE Contact
                         SET first_name = ?, last_name = ?, email = ?, phone_number = ?, message = ?,subject = ?,contact_date = ?
                         WHERE id_contact = ?`; // Requête SQL pour mettre à jour les informations du contact dans la base de données
  const values = [
    first_name,
    last_name,
    email,
    phone_number,
    message,
    subject,
    new Date(),
    id, // Utiliser l'ID de service pour identifier l'enregistrement à mettre à jour
  ];
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations du contact  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification des informations du contact.",
      error: error,
    });
  }
};

// FIN  MODIFICATION DU CONTACT

//   DÉBUT SUPPRESSION CONTACT

module.exports.contactdelete = async (req, res) => {
  const query = ` DELETE FROM Contact  WHERE id_contact =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `contact supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du  contact",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION  CONTACT
