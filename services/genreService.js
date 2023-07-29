const { Genre } = require("../models/genre");

const getAllGenres = async (projection = "-__v", sortOptions = "name") => {
  const genres = await Genre.find().select(projection).sort(sortOptions);

  return genres;
};

const getGenreById = async (id, projection = "-__v") => {
  const genre = await Genre.findById(id).select(projection);

  return genre;
};

const createGenre = async (genreData) => {
  let genre = await Genre.findOne({ genreData });
  if (genre) throw new Error("Genre already exists.");

  genre = new Genre({ genreData });
  await genre.save();

  return genre;
};

const updateGenreById = async (id, genreData) => {
  const genre = await Genre.findByIdAndUpdate(
    id,
    { name: genreData },
    { new: true }
  );

  if (!genre) throw new Error("Genre not found.");

  return genre;
};

const deleteGenreById = async (id) => {
  const genre = await Genre.findByIdAndDelete(id);

  if (!genre) throw new Error("Genre not found.");

  return genre;
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreById,
  deleteGenreById,
};
