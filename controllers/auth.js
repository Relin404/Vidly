const _ = require("lodash");
const Joi = require("joi");

const { User } = require("../models/user");

const { comparePassword } = require("../utils/credentials");

const validateUser = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
};

const createToken = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isPasswordNew = await comparePassword(req.body.password, user.password);
  if (!isPasswordNew) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  return res.send(token);
};

module.exports = { createToken, validateUser };
