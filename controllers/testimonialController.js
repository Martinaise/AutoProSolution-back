const { query } = require("express");
const db = require("../db/connect_bdd");

// DÉBUT APPROBATION D'UN COMMENTAIRE
module.exports.testimonialapprove = async (req, res) => {
  const { id } = req.params;
  const approveQuery = `UPDATE Testimonial SET approved = true WHERE id_testimonial = ?`;

  try {
      await db.executeQuery(approveQuery, [id] );
    res.status(200).json({
      message: `Le commentaire avec l'ID ${id} a été approuvé avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de l'approbation du commentaire.",
      error: error,
    });
  }
};
// FIN APPROBATION D'UN COMMENTAIRE
//  DÉBUT CREATION COMMENTAIRE

module.exports.testimonialcreate = async (req, res) => {
  const {
    first_name, 
    last_name,
    email, 
    comment, 
    rating ,
  } = req.body;

  if (
    !first_name||
    !last_name ||
    !email ||
    ! comment ||
    !rating ||
    rating < 1 ||   // Vérification que la note est supérieure ou égale à 1
    rating > 5     // Vérification que la note est inférieur
    
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Testimonial (first_name, last_name , email,comment,rating,testimonial_date ) VALUES (?, ?, ?,?,?,?)`;
  const values = [
    first_name, 
    last_name,
    email, 
    comment, 
    rating ,
    new Date(), // on prnd la date du jour
     false ,// la valeur par défaut pour la validation du commenraire
    
  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le commentaire  a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du commentaire ",
      error: error,
    });
  }
};
//  FIN  CREATION COMMENTAIRE

//  DÉBUT RECUPERATION  TOUS LES  COMMENTAIRES
module.exports.testimonialgets = async (req, res) => {
  const query = "SELECT * FROM Testimonial WHERE approved = true"; // récupérations des commentaires approuvés seulement
  try {
    const testimonials = await db.executeQuery(query);
    res.status(201).json({
        testimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des  commentaires",
      error: error,
    });
  }
};
// FIN  RECUPERATION DES COMMENTAIRES

//  DÉBUT RECUPERATION  D'UN COMMENTAIRE
module.exports.testimonialget = async (req, res) => {
  const query = ` SELECT * FROM Testimonial WHERE id_testimonial = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const testimonial = await db.executeQuery(query, value);
    res.status(201).json({
        testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du commentaire",
      error: error,
    });
  }
};
//  FIN  RECUPERATION D'UN COMMENTAIRE

// DÉBUT MODIFICATION COMMENTAIRE
module.exports.testimonialput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const {
        first_name, 
        last_name,
        email, 
        comment, 
        rating,
  } = req.body; // Récupérer les nouvelles données de l'utilisateur depuis le corps de la requête

  // Vérifier si les nouvelles données de l'utilisateur sont fournies
  if (
    !first_name||
    !last_name ||
    !email ||
    !comment ||
    !rating 
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification du commentaire.",
    });
  }

  const updateQuery = `UPDATE Testimonial  SET first_name = ?, last_name = ?, email = ?, comment = ?, rating = ?,testimonial_date = ?
                         WHERE id_testimonial = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    first_name,
    last_name ,
    email, 
    comment, 
    rating,
    new Date(),
    id, // Utiliser l'ID de l'utilisateur pour identifier l'enregistrement à mettre à jour
  ];
  try {
    await db.executeQuery(updateQuery, values); // Exécuter la requête de mise à jour dans la base de données
    res.status(200).json({
      message: `Les informations du commentaire  avec l'ID ${id} ont été mises à jour avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification des informations du commentairer.",
      error: error,
    });
  }
};

// FIN  MODIFICATION COMMENTAIRE

//   DÉBUT SUPPRESSION COMMENTAIRE

module.exports.testimonialdelete = async (req, res) => {
  const query = `DELETE FROM Testimonial WHERE id_testimonial =? `;
  const { id } = req.params;
  const value = [id];
  try {
    await db.executeQuery(query, value);
    res.status(201).json({
      message: `commentaire supprimer ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du commentaire",
      error: error,
    });
  }
};
//  FIN  SUPPRESSION DU COMMENTAIRE
