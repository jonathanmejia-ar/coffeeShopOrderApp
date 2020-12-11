const express = require('express');
const router = express();

//Schema model
const Customer = require('../models/customer');

router.get('/', (req, res) => res.send('Customer API'));

router.get('/customerList', async (req, res) => {
    await Customer.find().then(data => res.status(200).send(data)).catch(err => res.status(404).send({ error: err }));
})

module.exports = router;