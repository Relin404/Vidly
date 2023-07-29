const jwt = require("jsonwebtoken");

const config = require("../config");

const authenticate = (req, res, next) => {
  if (!config.requiresAuth) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied; no token provided.");

  try {
    const privateKey = config.jwtPK;
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;
