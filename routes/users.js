const express = require("express");

const usersController = require("../controllers/users");

const { validateUser } = require("../models/user");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");

const router = express.Router();

router.get("/", /*[auth],*/ usersController.listUsers);

router.get("/:id", [auth], usersController.getUser);

router.post("/", [validator(validateUser)], usersController.addUser);

router.put("/:id", [auth, validator(validateUser)], usersController.updateUser);

module.exports = router;
