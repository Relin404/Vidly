const validator = (modelValidator) => {
  return (req, res, next) => {
    const { error } = modelValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};

module.exports = validator;
