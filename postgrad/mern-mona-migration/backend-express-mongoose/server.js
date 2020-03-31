
const mongoose = require('mongoose');

// Make a connection to the local Mongo DB
// Note you don't need to specify the port,
// it will use the default of 27017
mongoose.connect('mongodb://localhost/mona', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( () => {
  console.log('Successfully connected to MongoDB.');
})
.catch( err => {
  console.error('Connection error', err);
});

const Artist = require('./db/models/artist');

////////////// Express setup

const express = require('express');
const app = express();
// const PORT = process.argv[2] || 1337;
const PORT = 1337;

app.get('/', (req, res) => {
  console.log('GET request to /');
  res.send('Hello world!');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}/ ...`);
});

// Export the main app so we can require() it
// in our tests
module.exports = {
  app,
  server
}
