const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

module.exports.mongoConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Connected to MongoDB Atlas!');
    } catch (err) {
        console.log(err);
    }
};
