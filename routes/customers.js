const express = require("express");

const customersController = require("../controllers/customers");

const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/admin");
const validator = require("../middlewares/validate");

const { validateCustomer } = require("../models/customer");

const router = express.Router();

router.get("/", [auth], customersController.listCustomers);

router.get("/:id", [auth], customersController.getCustomer);

router.post(
  "/",
  [auth, validator(validateCustomer)],
  customersController.addCustomer
);

router.put(
  "/:id",
  [auth, validator(validateCustomer)],
  customersController.updateCustomer
);

router.delete("/:id", [auth, isAdmin], customersController.deleteCustomer);

module.exports = router;
