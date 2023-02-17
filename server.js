const express = require('express');
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://patrickmeade4:<password>@cluster0.lac0cfm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
