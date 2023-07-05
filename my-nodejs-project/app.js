const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
// Use cors middleware
app.use(cors({
    //origin: "http://localhost:4200", 
    credentials: true
}));

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET;

// Connection to MongoDB
const connectionString = 'mongodb+srv://hr-ms:isaac@cluster1.gfnogox.mongodb.net/';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api', userRoutes);

const port = 3000; 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});