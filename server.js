const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://patrickmeade4:DvXduHQBohYJy63B@cluster0.lac0cfm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });


  app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('User created successfully');
      }
    });
  });
  
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
