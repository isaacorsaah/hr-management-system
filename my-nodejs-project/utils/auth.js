const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Set up body parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// Define login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Look up user in database
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Successful login
  res.json({ message: 'Login successful' });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
module.exports = { authenticate };