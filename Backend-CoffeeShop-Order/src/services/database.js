const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

module.exports.mongoConnect = () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    }).then(db => console.log('Connected to MongoDB Atlas!'))
        .catch(err => console.log(err));
};
