const mongoose = require("mongoose");

const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");

const createReturn = async (customerId, movieId) => {
  const rental = await Rental.lookup(customerId, movieId);
  if (!rental) throw new Error("Rental not found.");
  if (rental.dateReturned) throw new Error("Return already processed.");

  rental.return();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await rental.save({ session });

    await Movie.findByIdAndUpdate(
      rental.movie._id,
      { $inc: { numberInStock: 1 } },
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

module.exports = { createReturn };
