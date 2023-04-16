const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
    .then(() => console.log(chalk.hex("#00FF00")(`Connected to ${db}...`)));
  // .catch((err) =>
  //   console.error(chalk.hex("#FF0000")("Could not connect to MongoDB..."))
  // );
};
