// Models Manipulation
const mongoose = require("mongoose");
// Logging
const winston = require("winston");
// Terminal Styling
const chalk = require("chalk");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => winston.info("Connected to MongoDB..."))
    .then(() => console.log(chalk.hex("#00FF00")("Connected to MongoDB...")));
  // .catch((err) =>
  //   console.error(chalk.hex("#FF0000")("Could not connect to MongoDB..."))
  // );
};
