const winston = require("winston");

// Only logs Express Pipeline-related entries (doesn't log errors happening outside the pipeline)
module.exports = function (err, req, res, next) {
  // Log the exception
  winston.error(err.message, err);
  // error
  // warn
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
