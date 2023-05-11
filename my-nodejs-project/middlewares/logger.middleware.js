function logger(req, res, next) {
    console.log(`${req.method} ${req.url} - ${req.headers['user-agent']}`);
    next();
  }
  
module.exports = { logger };  