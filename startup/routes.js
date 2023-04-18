// Middleware Routes
const error = require("../middleware/error");
// Requests Routes
const auth = require("../routes/auth");
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const returns = require("../routes/returns");
const users = require("../routes/users");
// Main Express App
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
