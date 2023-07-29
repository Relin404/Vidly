const express = require("express");

const rentalsController = require("../controllers/rentals");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");

const { validateRental } = require("../models/rental");

const router = express.Router();

router.get("/", [auth], rentalsController.listRentals);

router.get("/:id", [auth], rentalsController.getRental);

router.post(
  "/",
  [auth, validator(validateRental)],
  rentalsController.addRental
);

module.exports = router;
