const db = require("../db/connect_bdd");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// _____________TOKEN__________
// Créer un token avec une durée de validité
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (user) => {
  return jwt.sign(
    { user },
    // token definit dans.env
    process.env.TOKEN,
    {
      expiresIn: maxAge,
    }
  );
};
// ____________TOKEN__________

// début AUTHENTIFICATION

module.exports.login = async (req, res) => {
  // on recupere la requette saisit par l'utilisateur
  const { email,  password } = req.body;

  // on verifie que les champps de la requettes ne sont pas vide
  if (!email || ! password) {
    return res.status(404).json({
      message: "remplissez tous les champs",
    });
  }

  // envois a la bdd ce que la personne a saisit
  try {
    const loginQuery = `SELECT * FROM User WHERE email = ? `;
    const values = [email];
    const user = await db.executeQuery(loginQuery, values);
    // on verrifie si mot de passe ou email valide
    //si pas user on s'arrette la
    if (!user[0]?.id_user) {
      return res.status(404).json({
        message: "l'email est invalide",
      });
    }
    // on compare le mot de passe de la bdd et celui entreer parle  user et on le decripte avec bcrypt
    const verrification_password = await bcrypt.compare(
        password,
      user[0]?.password
    );
    if (!verrification_password) {
      return res.status(404).json({
        message: "Le mot de passe est invalide",
      });
    }

    // appeel fonction création du token
    const token = createToken(user[0]);

    return res.status(201).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `une erreur s'est produite ${error}`,
    });
  }
};
//fin  AUTHENTIFICATION
