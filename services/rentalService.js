const mongoose = require("mongoose");

const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");

const getAllRentals = async (projection = "-__v", sortOptions = "-dateOut") => {
  const rentals = await Rental.find().select(projection).sort(sortOptions);

  return rentals;
};

const getRentalById = async (id, projection = "-__v") => {
  const rental = await Rental.findById(id).select(projection);

  return rental;
};

const createRental = async (rentalData) => {
  const customer = await Customer.findById(rentalData.customerId);
  if (!customer) throw new Error("Invalid customer.");

  const movie = await Movie.findById(rentalData.movieId);
  if (!movie) throw new Error("Invalid movie.");

  if (movie.numberInStock === 0) throw new Error("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // Start a session for consistency and to enable transactions
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    await rental.save({ session });

    await Movie.findByIdAndUpdate(
      rental.movie._id,
      { $inc: { numberInStock: -1 } },
      { session }
    );

    await session.commitTransaction();

    return rental;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
};
