const _ = require("lodash");

const { User } = require("../models/user");

const { hashPassword, comparePassword } = require("../utils/credentials");

const getAllUsers = async (
  projection = "-password -__v",
  sortOptions = "name"
) => {
  const users = await User.find().select(projection).sort(sortOptions);

  return users;
};

const getUserById = async (id, projection = "-password -__v") => {
  const user = await User.findById(id).select(projection);

  return user;
};

const createUser = async (userData) => {
  let user = await User.findOne({ email: userData.email });
  if (user) throw new Error("User already registered.");

  user = new User(_.pick(userData, ["name", "email", "password", "isAdmin"]));
  user.password = await hashPassword(user.password);

  await user.save();

  return _.pick(user, ["_id", "name", "email", "isAdmin"]);
};

const updateUserById = async (id, userData) => {
  let user = await User.findById(id);
  if (!user) throw new Error("User not found.");

  const { name, email, password, isAdmin } = _.pick(userData, [
    "name",
    "email",
    "password",
    "isAdmin",
  ]);

  const isPasswordNew = await comparePassword(password, user.password);

  if (isPasswordNew) {
    user.password = await hashPassword(password);

    user = await User.findByIdAndUpdate(
      id,
      { name, email, password, isAdmin },
      { new: true }
    );
  } else {
    user = await User.findByIdAndUpdate(
      id,
      { name, email, isAdmin },
      { new: true }
    );
  }

  return _.pick(user, ["_id", "name", "email", "isAdmin"]);
};

module.exports = { getAllUsers, getUserById, createUser, updateUserById };
