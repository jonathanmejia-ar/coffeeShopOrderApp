const customerController = {}

const Customer = require('./customer.model');

customerController.getCustomers = async (req, res) => {
    let customers = await Customer.find();
    if (!customers) throw new Error('Customers not found');
    return res.status(200).send(customers);
};

module.exports = customerController;