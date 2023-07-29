const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const api = require("./routes/api");

const app = express();

// Security and protection middlewares
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use(compression());
app.use(helmet());

// Built-in middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/v1", api);

module.exports = app;
