const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/login', usersController.getLoginPage);
router.post('/login', usersController.authenticateUser);

module.exports = router;