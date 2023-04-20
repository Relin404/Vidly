const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const validate = require("../middleware/validate");
const { JsonWebTokenError } = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const validateAuth = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

router.post("/", validate(validateAuth), async (req, res) => {
  // Find in database user model (findOne takes a parameter to search for and returns true if exists)
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
