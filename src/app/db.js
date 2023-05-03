const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hr-management-system', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully!');
});