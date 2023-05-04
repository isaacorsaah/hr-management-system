const session = require('express-session');

// Middleware function to handle user sessions and authentication
const sessionMiddleware = session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // Session will expire in 1 hour
});

// Middleware function to protect routes that require authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = {
  sessionMiddleware,
  requireAuth
};