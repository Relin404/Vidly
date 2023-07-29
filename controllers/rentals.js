const rentalService = require("../services/rentalService");

const asyncWrapper = require("../utils/asyncWrapper");

const listRentals = asyncWrapper(async (req, res) => {
  const rentals = await rentalService.getAllRentals();
  return res.send(rentals);
});

const getRental = asyncWrapper(async (req, res) => {
  const rental = await rentalService.getRentalById(req.params.id);

  if (!rental) return res.status(404).send("Rental not found.");

  return res.send(rental);
});

const addRental = asyncWrapper(async (req, res) => {
  const rental = await rentalService.createRental(req.body);

  return res.status(201).send(rental);
});

module.exports = {
  listRentals,
  getRental,
  addRental,
};
