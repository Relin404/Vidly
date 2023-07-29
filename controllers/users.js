const userService = require("../services/userService");

const asyncWrapper = require("../utils/asyncWrapper");
const { generateAuthToken } = require("../utils/token");

const listUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();

  return res.send(users);
});

const getUser = asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  return res.send(user);
});

const addUser = asyncWrapper(async (req, res) => {
  const user = await userService.createUser(req.body);

  const token = generateAuthToken(user);

  return res.header("x-auth-token", token).status(201).send(user);
});

const updateUser = asyncWrapper(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);

  const token = generateAuthToken(user);

  return res.header("x-auth-token", token).send(user);
});

module.exports = { listUsers, getUser, addUser, updateUser };
