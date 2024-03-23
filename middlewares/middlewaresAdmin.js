
module.exports.checkAdmin = function (req, res, next) {
  const { user } = req;
  const isAdmin = Boolean(user?.user[0]?.is_admin); // Conversion en boolean
  console.log(typeof isAdmin);

  if (!isAdmin) {
    return next();
  }

  return res.status(403).json({ error: 'Accès refusé. Seuls les administrateurs peuvent accéder à cette ressource'});
}

