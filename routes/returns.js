const express = require("express");
const Joi = require("joi");

const returnsController = require("../controllers/returns");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");

const router = express.Router();

const validateReturn = (req) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
};

router.post(
  "/",
  [auth, validator(validateReturn)],
  returnsController.addReturn
);

module.exports = router;
