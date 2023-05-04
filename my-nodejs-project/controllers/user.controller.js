const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.getLoginPage = (req, res) => {
  res.render('login');
}

exports.authenticateUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { 
      req.flash('error', info.message);
      return res.redirect('/login'); 
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      if (user.role === 'admin') {
        return res.redirect('/admin-dashboard');
      } else {
        return res.redirect('/employee-dashboard');
      }
    });
  })(req, res, next);
};