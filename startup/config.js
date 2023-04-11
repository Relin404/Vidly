// Environment Configuration
const config = require("config");
const dotenvConfig = require("dotenv").config();
// Logging
const winston = require("winston");

module.exports = function () {
  if (!process.env.jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined!");
  }
};
