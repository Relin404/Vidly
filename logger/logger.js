const { add, format, createLogger, transports } = require("winston");
const {
  colorize,
  combine,
  timestamp,
  json,
  label,
  printf,
  prettyPrint,
  simple,
} = format;
const { Console, File } = transports;

// require('winston-mongodb');
require("express-async-errors");

/**
 * @description  This function initiates the logger
 * @returns {void} Nothing
 * @param {void} Nothing
 * @see {@link https://www.npmjs.com/package/winston | Winston}
 */
const initiateLogger = () => {
  const logger = createLogger({
    format: combine(
      timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
      }),
      json(),
      prettyPrint()
    ),
    transports: [
      new Console({
        format: combine(colorize(), simple()),
      }),
      new File({
        filename: "logger/logfile.log",
        level: "info",
      }),
      new File({
        filename: "logger/uncaughtExceptions.log",
        level: "error",
        handleRejections: true,
      }),
    ],
  });

  // add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });

  add(logger);
};

module.exports = initiateLogger;
