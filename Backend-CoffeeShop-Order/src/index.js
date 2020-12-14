require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');
const { errorHandler, errorHandler404 } = require('./middleware/error');

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
const indexRouter = require('./routes/index');

//routes
app.get('/', (req, res) => res.send('Please go to /api for more information! '));
app.use('/api', indexRouter);
app.use(errorHandler404);
app.use(errorHandler);

//listen
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} !`);
});

module.exports = app;