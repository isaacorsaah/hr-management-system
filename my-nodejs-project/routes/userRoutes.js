// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

router.post('/login', async (req, res) => {
  console.log(req.body); 
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ "email": email });
      if (!user) {
          console.log('User not found'); 
          return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log('Passwords do not match');
          return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      res.status(200).json({ role: user.role, email: user.email });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/createUser', async (req, res) => {
  try {
    console.log(req.body);
    const {username, email, password, role } = req.body;
    const existingUser = await User.findOne({ "email": email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({username, email, password: hashedPassword, role });
    await user.save();
    res.status(200).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/getUser/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;