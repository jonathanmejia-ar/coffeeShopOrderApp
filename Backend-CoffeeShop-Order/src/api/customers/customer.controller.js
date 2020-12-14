const customerController = {}

const Customer = require('./customer.model');


customerController.home = (req, res) => res.status(200).send('Customers API');

customerController.getCustomers = async (req, res) => {
    try {
        let customers = await Customer.find();
        if (!customers) throw new Error('Customers not found');
        res.status(200).send(customers);
    }
    catch (err) {
        next(err);
    }
};

module.exports = customerController;