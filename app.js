require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
// Middlewares
const error = require("./middleware/error");
// Environment Configuration
const config = require("config");
const dotenvConfig = require("dotenv").config();
// Schema Validation
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// Models Manipulation
const mongoose = require("mongoose");
// Routes
const auth = require("./routes/auth");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
// Terminal Styling
const chalk = require("chalk");
// Main Express App
const express = require("express");
const app = express();

winston.add(
  new winston.transports.File({
    filename: "logfile.log",
  })
);

winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://127.0.0.1/vidly",
  })
);

/* if (!config.has("jwtPrivateKey")) {
   console.error("FATAL ERROR: jwtPrivateKey is not defined!");
   process.exit(1);
} */

// Quit if jwtPrivateKey is not found
if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
}
console.log(chalk.hex("#FFF111")`Private key is: ${process.env.jwtPrivateKey}`);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log(chalk.hex("#00FF00")("Connected to MongoDB...")))
  .catch((err) =>
    console.error(chalk.hex("#FF0000")("Could not connect to MongoDB..."))
  );

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(chalk.hex("#F000FF")`Listening on port ${port}...`)
);
