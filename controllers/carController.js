const { query } = require("express");
const db = require("../db/connect_bdd");
//  DÉBUT CREATION

module.exports.carcreate = async (req, res) => {
  const {
    title,
    description,
    price,
    main_image,
    year_of_manufacture,
    mileage,
    images,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !main_image ||
    !year_of_manufacture ||
    !mileage ||
    !images
  ) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  const createExecuteQuery = `INSERT INTO Car (title, description, price, main_image, year_of_manufacture,
    mileage, images) VALUES (?, ?, ?,?,?, ?,?)`;
  const values = [
    title,
    description,
    price,
    main_image,
    year_of_manufacture,
    mileage,
    images,
  ];

  try {
    await db.executeQuery(createExecuteQuery, values);
    res.status(201).json({
      message: "le car  a été créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de car ",
      error: error,
    });
  }
};
//  FIN  CREATION

//  DÉBUT RECUPERATION  CARS
module.exports.cargets = async (req, res) => {
  const query = "SELECT * FROM Car";
  try {
    const cars = await db.executeQuery(query);
    res.status(201).json({
      cars,
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur est survenue lors de la  récupération des cars",
      error: error,
    });
  }
};
// FIN  RECUPERATION CARS

//  DÉBUT RECUPERATION  CAR
module.exports.carget = async (req, res) => {
  const query = ` SELECT * FROM Car WHERE id_car = ?`;
  const id = req.params.id;
  const value = [id];

  try {
    const car = await db.executeQuery(query, value);
    res.status(201).json({
      car,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des user",
      error: error,
    });
  }
};
//  FIN  RECUPERATION  CAR

// DÉBUT MODIFICATION CAR
module.exports.carput = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de car  à modifier depuis les paramètres de la requête
  const {
    title,
    description,
    price,
    main_image,
    year_of_manufacture,
    mileage,
    images,
  } = req.body; // Récupérer les nouvelles données de l'utilisateur depuis le corps de la requête

  // Vérifier si les nouvelles données de l'utilisateur sont fournies
  if (
    !title ||
    !description ||
    !price ||
    !main_image ||
    !year_of_manufacture ||
    !mileage ||
    !images
  ) {
    return res.status(400).json({
      message:
        "Veuillez fournir toutes les informations nécessaires pour la modification de car.",
    });
  }

  const updateQuery = `UPDATE Car 
                         SET title = ?, description = ?, price = ?, main_image = ?, year_of_manufacture = ?, images = ?, mileage = ?
                         WHERE id_car = ?`; // Requête SQL pour mettre à jour les informations de car dans la base de données
  const values = [
    title,
    description,
    price,
    main_image,
    year_of_manufacture,
    images,
    mileage,
    id, // Utiliser l'ID de l'utilisateur pour identifier l'enregistrement à mettre à jour
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

module.exports.cardelete = async (req, res) => {
  const query = ` DELETE FROM car WHERE id_car =? `;
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
