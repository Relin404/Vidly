const returnService = require("../services/returnService");

const asyncWrapper = require("../utils/asyncWrapper");

const addReturn = asyncWrapper(async (req, res) => {
  const rental = await returnService.createReturn(
    req.body.customerId,
    req.body.movieId
  );

  return res.status(201).send(rental);
});

module.exports = { addReturn };
