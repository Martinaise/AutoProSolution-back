// importe la bdd
const db = require("../db/connect_bdd");
// début creer user
module.exports.usercreate = async (req, res) => {
  //recupérations des données
  const { email, password, first_name, last_name, phone_number } = req.body;
  // création de l'amin par défaut a false
  const is_admin = false;

  // vérification des données  on verifie que les champps de la requettes ne sont pas vide
  if (!email || !password || !first_name || !last_name || !phone_number) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }
  //  je prépare ma requette pour inserrer à la  bdd
  //  requette préparer pour eviter les injections sql
  const createExecuteQuery = `INSERT INTO User (email , password, first_name, last_name,  phone_number,is_admin) 
    VALUES (?, ?, ?,?,?, ?)`;
  const values = [
    email,
    password,
    first_name,
    last_name,
    phone_number,
    is_admin,
  ];
  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le user  a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de user",
      error: error,
    });
  }
};
//fin creer user

// début obtenir  plusieurs  utilisateurs
module.exports.usergets = async (req, res) => {
  // prepare me requette
  const query = `SELECT * FROM User`;
  try {
    const users = await db.executeQuery(query);
    res.status(201).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des users",
      error: error,
    });
  }
};
//fin obtenir plusieurs  utilisateurs

//  début obtenir un utilisateur
module.exports.userget = async (req, res) => {
  // prepare me requette
  const query = `SELECT * FROM User WHERE id_user = ?`;
  const id = req.params.id; //par destructuration const {id} = req.params
  const value = [id];
  try {
    const user = await db.executeQuery(query, value);
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des users",
      error: error,
    });
  }
};
//fin obtenir un utilisateur

/////:::::::::::::::::::::::::::::
// Début modifier un utilisateur
module.exports.userput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'utilisateur à modifier depuis les paramètres de la requête
  const { email, password, first_name, last_name, phone_number } = req.body; // Récupérer les nouvelles données de l'utilisateur depuis le corps de la requête

  // Vérifier si les nouvelles données de l'utilisateur sont fournies
  if (!email || !password || !first_name || !last_name || !phone_number) {
    return res.status(400).json({
      message: "Veuillez fournir toutes les informations nécessaires pour la modification de l'utilisateur.",
    });
  }

  const updateQuery = `UPDATE User 
                       SET email = ?, password = ?, first_name = ?, last_name = ?, phone_number = ?
                       WHERE id_user = ?`; // Requête SQL pour mettre à jour les informations de l'utilisateur dans la base de données
  const values = [
    email,
    password,
    first_name,
    last_name,
    phone_number,
    id // Utiliser l'ID de l'utilisateur pour identifier l'enregistrement à mettre à jour
  ];

  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations de l'utilisateur avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la modification des informations de l'utilisateur.",
      error: error,
    });
  }
};
// Fin modifier un utilisateur

/////////////////////////////////////


//fin modifier utilisateur

// début supprimer un utilisateur
module.exports.userdelete = async (req, res) => {
  const query = ` DELETE FROM User WHERE id_user =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `utilisateur supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du user",
      error: error,
    });
  }
};
//fin supprimer un utilisateur
