const express = require("express");

const auth = require("./auth");
const customers = require("./customers");
const genres = require("./genres");
const movies = require("./movies");
const rentals = require("./rentals");
const returns = require("./returns");
const users = require("./users");

const error = require("../middlewares/error");

const api = express.Router();

api.use("/auth", auth);
api.use("/customers", customers);
api.use("/genres", genres);
api.use("/movies", movies);
api.use("/rentals", rentals);
api.use("/returns", returns);
api.use("/users", users);
api.use(error);

module.exports = api;
