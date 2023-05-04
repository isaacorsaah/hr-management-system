const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});