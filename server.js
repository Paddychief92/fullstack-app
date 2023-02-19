const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://patrickmeade4:DvXduHQBohYJy63B@cluster0.lac0cfm.mongodb.net/?retryWrites=true&w=majority";

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
