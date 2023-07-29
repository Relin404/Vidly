const moment = require("moment");

const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");

const getAllMovies = async (projection = "-__v", sortOptions = "title") => {
  const movies = await Movie.find().select(projection).sort(sortOptions);

  return movies;
};

const getMovieById = async (id, projection = "-__v") => {
  const movie = await Movie.findById(id).select(projection);

  return movie;
};

const createMovie = async (movieData) => {
  let movie = await Movie.findOne({ title: movieData.title });
  if (movie) throw new Error("Movie already exists.");

  const genre = await Genre.findOne({ name: movieData.genre });
  if (!genre) throw new Error("Invalid genre.");

  movie = new Movie({
    title: movieData.title,
    genre: movieData.genre,
    numberInStock: movieData.numberInStock,
    dailyRentalRate: movieData.dailyRentalRate,
    publishDate: moment().toJSON(),
  });

  await movie.save();

  return movie;
};

const updateMovieById = async (id, movieData) => {
  const genre = await Genre.findOne({ name: movieData.genre });
  if (!genre) throw new Error("Invalid genre.");

  let movie = await Movie.findByIdAndUpdate(
    id,
    {
      title: movieData.title,
      genre: movieData.genre,
      numberInStock: movieData.numberInStock,
      dailyRentalRate: movieData.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) throw new Error("Movie not found.");

  return movie;
};

const deleteMovieById = async (id) => {
  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) throw new Error("Movie not found.");

  return movie;
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
};
