const isAdmin = (req, res, next) => {
  if (!process.env.REQUIRES_AUTH) return next();

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};

module.exports = isAdmin;
