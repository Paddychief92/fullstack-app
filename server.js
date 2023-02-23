const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb+srv://patrickmeade4:DvXduHQBohYJy63B@cluster0.lac0cfm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Create a mongoose schema for the user collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a mongoose model for the user collection using the user schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB Atlas database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// Set up a POST route to handle new user creation or password updates
app.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username }); // find the user in the database by username
    if (!user) { // if user not found, create a new one
      user = new User({
        username,
        password
      });
    } else { // if user found, update the password for the found user
      user.password = password;
    }
    await user.save(); // save the updated user or new user in the database
    res.send(`User ${username} ${user.isNew ? 'created' : 'updated'} with new password`);
  } catch (error) {
    console.log(error);
    res.send('Error creating/updating user');
  }
});

// Start the server listening on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
