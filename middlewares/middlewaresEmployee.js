//permet de donner accès à l'employé
module.exports = function (req, res, next) {
    if (req.user && req.user.role_user === "apployee") {
      return next();
    }
  
    return res.send(403, { error: 'Accès refusé. Seuls les employés peuvent accèder à cette ressource'});
  }