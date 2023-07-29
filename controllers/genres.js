const genreService = require("../services/genreService");

const asyncWrapper = require("../utils/asyncWrapper");

const listGenres = asyncWrapper(async (req, res) => {
  const genres = await genreService.getAllGenres();

  return res.send(genres);
});

const getGenre = asyncWrapper(async (req, res) => {
  const genre = await genreService.getGenreById(req.params.id);

  if (!genre) return res.status(404).send("Genre not found.");

  return res.send(genre);
});

const addGenre = asyncWrapper(async (req, res) => {
  const genre = await genreService.createGenre(req.body);

  return res.send(genre);
});

const updateGenre = asyncWrapper(async (req, res) => {
  const genre = await genreService.updateGenreById(req.params.id, req.body);

  if (!genre) return res.status(404).send("Genre not found.");

  return res.send(genre);
});

const deleteGenre = asyncWrapper(async (req, res) => {
  const genre = await genreService.deleteGenreById(req.params.id);

  if (!genre) return res.status(404).send("Genre not found.");

  return res.send(genre);
});

module.exports = {
  listGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre,
};
