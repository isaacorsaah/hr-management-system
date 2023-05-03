const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/mydb';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const collection = db.collection('users');
    collection.findOne({ email: email, password: password }, (err, user) => {
      if (err) throw err;
      if (user) {
        // Authentication successful
        res.send({ message: 'Authentication successful' });
      } else {
        // Authentication failed
        res.status(401).send({ message: 'Authentication failed' });
      }
      db.close();
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});