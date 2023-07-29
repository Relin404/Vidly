const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  return next();
};

module.exports = validateObjectId;
