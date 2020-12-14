require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');
const { errorHandler, errorHandler404 } = require('./middleware/error');

//app config
const app = express();

//middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }))
app.use(cors());
app.use(morgan('dev'));

//import routes
const indexRouter = require('./routes/index');

//routes
app.get('/', (req, res) => res.send('Please go to /api for more information! '));
app.use('/api', indexRouter);
app.use(errorHandler404);
app.use(errorHandler);

module.exports = app;