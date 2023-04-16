const express = require("express");
const app = express();
const winston = require("winston");
const chalk = require("chalk");

const checkConfig = require("./startup/config");
checkConfig();
const startLogger = require("./startup/logging");
startLogger();
const initiateValidation = require("./startup/validation");
initiateValidation();
const initiateRoutes = require("./startup/routes");
initiateRoutes(app);
const startDatabase = require("./startup/db");
startDatabase();

// const promise = Promise.reject(new Error("Something failed miserably"));
// promise.then(() => console.log("Done"));
// throw new Error("Something failed during startup.");

console.log(chalk.hex("#FFF111")`Private key is: ${process.env.jwtPrivateKey}`);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
  console.log(chalk.hex("#F000FF")`Listening on port ${port}...`);
});

module.exports = server;
