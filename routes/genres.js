const express = require("express");

const genresController = require("../controllers/genres");

const isAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");

const { validateGenre } = require("../models/genre");

const router = express.Router();

router.get("/", genresController.listGenres);

router.get("/:id", [validateObjectId], genresController.getGenre);

router.post(
  "/",
  [auth, isAdmin, validator(validateGenre)],
  genresController.addGenre
);

router.put(
  "/:id",
  [auth, isAdmin, validateObjectId, validator(validateGenre)],
  genresController.updateGenre
);

router.delete(
  "/:id",
  [auth, isAdmin, validateObjectId],
  genresController.deleteGenre
);

module.exports = router;
