const Joi = require("joi");
const mongoose = require("mongoose");

const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    // type: genreSchema,
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  publishedDate: {
    type: Date,
    default: Date.now(),
  },
});

const Movie = mongoose.model("Movies", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
};

module.exports = { movieSchema, Movie, validateMovie };
