module.exports = {
    errorHandler: (err, req, res, next) => {
        console.log(err);
        const statusCode = err.statusCode || 500;
        if (statusCode === 500) err.message = 'Internal Server Error'
        return res.status(statusCode).send(err.message);
    },
    errorHandler404: (req, res, next) => {
        return res.status(404).send(`Requested URL ${req.path} not found`);
    }
};