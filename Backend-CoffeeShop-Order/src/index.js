require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');
const createError = require('http-errors')

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

//api routes
// app.all('*', (req, res) => {
//     throw new createError(400, `Requested URL ${req.path} not found!`)
// });

app.get('/', (req, res) => res.send('Please go to /api for more information! '));
app.use('/api', indexRouter);


//err handler
/*
app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
});*/

//listen

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} !`)
});

module.exports = app;