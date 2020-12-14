module.exports = {
    errorHandler: (err, req, res, next) => {
        console.log(err);
        const statusCode = err.statusCode || 500;
        if (statusCode === 500) err.message = 'Internal Server Error'
        res.status(statusCode).send(err.message);
    },
    errorHandler404: (req, res, next) => {
        res.status(404).send(`Requested URL ${req.path} not found`);
    }
};