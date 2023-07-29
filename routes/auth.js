const express = require("express");

const authController = require("../controllers/auth");

const validator = require("../middlewares/validate");

const router = express.Router();

router.post(
  "/",
  [validator(authController.validateUser)],
  authController.createToken
);

module.exports = router;
