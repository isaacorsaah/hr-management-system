const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

app.use(express.json());
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET;
mongoose.connect('mongodb://localhost/hr_management-system', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api', userRoutes);
const registerRouter = require('./routes/register');
app.use(registerRouter);

const port = 3000; 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});