require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');

//db config
require('./database');

//app config
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }))
app.use(cors());
app.use(morgan('dev'));

//import routes
const orderRouter = require('./routes/orderRoute');
const itemRouter = require('./routes/itemRoute');
const customerRouter = require('./routes/customerRoute');



//api routes
app.get('/', (req, res) => res.send('Please go to /api for more information! '));
app.get('/api', (req, res) => res.send('Welcome to Coffee Shop Order API'));

app.use('/api/order', orderRouter);
app.use('/api/item', itemRouter);
app.use('/api/customer', customerRouter);

//listen
app.listen(port, () => console.log(`Server on port: ${port} !`));