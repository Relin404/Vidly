const chalk = require("chalk");
const mongoose = require("mongoose");
const winston = require("winston");

const config = require("../config");

mongoose.connection.once("open", () => {
  winston.info(`MongoDB connection ready!`);
  console.log(chalk.greenBright.bold(`MongoDB connection ready!`));
});

mongoose.connection.on("error", (error) => {
  winston.error(`${error}`);
  console.error(chalk.hex("##FF0000")`${error}`);
});

const connectDB = async () => {
  const db = /*config.env === "development" ? config.localDb :*/ config.cloudDb;

  await mongoose.connect(db);

  winston.info(`Connected to cloud database!`);
  console.log(chalk.green.italic(`Connected to cloud database!`));
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  winston.info(`Database disconnected`);
};

module.exports = {
  connectDB,
  disconnectDB,
};

// const connectDBForMongoose5 = async () => {
//   try {
//     const db = process.env.CLOUD_MONGO_URL;

//     await mongoose.connect(db);
//     console.log(chalk.green(`Connected to ${db}`));
//   } catch (error) {
//     console.log(chalk.hex("#FF0000")`${error}`);
//   }
// };
