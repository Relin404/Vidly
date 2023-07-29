const { Customer } = require("../models/customer");

const getAllCustomers = async (projection = "-__v", sortOptions = "name") => {
  const customers = await Customer.find().select(projection).sort(sortOptions);

  return customers;
};

const getCustomerById = async (id, projection = "-__v") => {
  const customer = await Customer.findById(id).select(projection);

  return customer;
};

const createCustomer = async (customerData) => {
  let customer = await Customer.findOne({ phone: customerData.phone });
  if (customer) throw new Error("Customer already exists.");

  customer = new Customer({
    name: customerData.name,
    isGold: customerData.isGold,
    phone: customerData.phone,
  });

  customer = await customer.save();

  return customer;
};

const updateCustomerById = async (id, customerData) => {
  const customer = await Customer.findByIdAndUpdate(
    id,
    {
      name: customerData.name,
      isGold: customerData.isGold,
      phone: customerData.phone,
    },
    { new: true }
  );

  if (!customer) throw new Error("Customer not found.");

  return customer;
};

const deleteCustomerById = async (id) => {
  const customer = await Customer.findByIdAndRemove(id);

  if (!customer) throw new Error("Customer not found.");

  return customer;
};

module.exports = {
  getCustomerById,
  getAllCustomers,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
};
