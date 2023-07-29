const chalk = require("chalk");
const http = require("http");
const winston = require("winston");

const app = require("./app");

const config = require("./config");

const { connectDB } = require("./database/connection");

const logger = require("./logger/logger.js");

require("dotenv").config();
require("./loaders/validation")();

logger();

const server = http.createServer(app);

const startServer = async () => {
  try {
    const port = config.port;
    await connectDB();

    server.listen(port, () => {
      winston.info(`Server running on port ${port}`);
    });

    console.log(chalk.greenBright.bold(`Server running on port ${port}`));
  } catch (error) {
    winston.error(error, () => {
      process.exit(1);
      console.log("x");
    });

    console.error(chalk.hex("#FF0000")`${error}`);
  }
};

startServer();
