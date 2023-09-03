exports.LoggerMiddleware = (req, res, next) => {
    console.log(`Logged in ${req.url} ${req.method} -- ${new Date()}`);
    next();
}