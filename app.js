const express = require("express");
const app = express();
const winston = require("winston");
const chalk = require("chalk");

require("./startup/config"); // checkConfig
require("./startup/logging"); // startLogger
require("./startup/validation"); // initiateValidation
require("./startup/routes")(app); // initiateRoutes
require("./startup/db")(); // startDb
// if (process.env.NODE_ENV === "production")
require("./startup/prod")(app); //

console.log(chalk.hex("#FFF111")`Private key is: ${process.env.jwtPrivateKey}`);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
  console.log(chalk.hex("#F000FF")`Listening on port ${port}...`);
});

module.exports = server;
