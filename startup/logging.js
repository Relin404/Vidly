const winston = require("winston");
require("express-async-errors");
// require("winston-mongodb");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      colorize: true,
      prettyPrinte: true,
    }),
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
    })
  );

  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://127.0.0.1/vidly",
  //     level: "info",
  //   })
  // );
};
