const movieService = require("../services/movieService");

const asyncWrapper = require("../utils/asyncWrapper");

const listMovies = asyncWrapper(async (req, res) => {
  const movies = await movieService.getAllMovies();

  return res.send(movies);
});

const getMovie = asyncWrapper(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.id);

  if (!movie) return res.status(404).send("Movie not found.");

  return res.send(movie);
});

const addMovie = asyncWrapper(async (req, res) => {
  const movie = await movieService.createMovie(req.body);

  return res.status(201).send(movie);
});

const updateMovie = asyncWrapper(async (req, res) => {
  const movie = await movieService.updateMovieById(req.params.id, req.body);

  if (!movie) return res.status(404).send("Movie not found.");

  return res.send(movie);
});

const deleteMovie = asyncWrapper(async (req, res) => {
  const movie = await movieService.deleteMovieById(req.params.id);

  if (!movie) return res.status(404).send("Movie not found.");

  return res.send(movie);
});

module.exports = {
  listMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
