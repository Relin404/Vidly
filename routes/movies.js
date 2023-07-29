const express = require("express");

const moviesController = require("../controllers/movies");

const { validateMovie } = require("../models/movie");

const isAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");

const router = express.Router();

router.get("/", moviesController.listMovies);

router.get("/:id", validateObjectId, moviesController.getMovie);

router.post("/", [auth, validator(validateMovie)], moviesController.addMovie);

router.put(
  "/:id",
  [auth, validator(validateMovie)],
  moviesController.updateMovie
);

router.delete("/:id", [auth, isAdmin], moviesController.deleteMovie);

module.exports = router;
