// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
bcrypt.hash('admin1password', 10, function(err, hash) {
    console.log(hash);
});
router.post('/api/register', async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
  } catch (error) {
      res.status(400).send(error);
  }
});


router.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // Return user role on successful login
      res.status(200).json({ role: user.role });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/test', async(req,res)=>{
  res.status(200).json("Test Successful");
})

module.exports = router;