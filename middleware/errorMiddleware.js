const errorHandler = (err, req, res, next) => {
    const code = res.statusCode || 500;
    res.status(code);
    res.json({ message: err.message });
};

module.exports = errorHandler;