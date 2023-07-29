const customerService = require("../services/customerService");

const asyncWrapper = require("../utils/asyncWrapper");

const listCustomers = asyncWrapper(async (req, res) => {
  const customers = await customerService.getAllCustomers();

  return res.send(customers);
});

const getCustomer = asyncWrapper(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);

  if (!customer) return res.status(404).send("Customer not found.");

  return res.send(customer);
});

const addCustomer = asyncWrapper(async (req, res) => {
  let customer = await customerService.createCustomer(req.body);

  return res.status(201).send(customer);
});

const updateCustomer = asyncWrapper(async (req, res) => {
  const customer = await customerService.updateCustomerById(
    req.params.id,
    req.body
  );

  if (!customer) return res.status(404).send("Customer not found.");

  return res.send(customer);
});

const deleteCustomer = asyncWrapper(async (req, res) => {
  const customer = await customerService.deleteCustomerById(req.params.id);

  if (!customer) return res.status(404).send("Customer not found.");

  return res.send(customer);
});

module.exports = {
  listCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
