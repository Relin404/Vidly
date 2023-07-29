const jwt = require("jsonwebtoken");

const config = require("../config");

const generateAuthToken = (userDocument) => {
  const token = jwt.sign(
    {
      _id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
      isAdmin: userDocument.isAdmin,
    },
    config.jwtPK
  );

  return token;
};

module.exports = { generateAuthToken };
