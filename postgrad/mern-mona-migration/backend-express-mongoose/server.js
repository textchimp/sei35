
const mongoose = require('mongoose');

const dbName = (process.env.NODE_ENV === 'test') ? 'moma-test' : 'moma' ;

// Make a connection to the local Mongo DB
// Note you don't need to specify the port,
// it will use the default of 27017
mongoose.connect(`mongodb://localhost/${ dbName }`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( () => {
  console.log(`Successfully connected to MongoDB ${dbName}.`);
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

const cors = require('cors');
app.use( cors() );

app.get('/', (req, res) => {
  console.log('GET request to /');
  res.send('Hello world!');
});

// CRUD index
app.get('/artists', (req, res) => {
  console.log('GET /artists');
  Artist.find().then( artists => {
    res.json( artists );
  })
  .catch( err => {
    console.log('Error', err);
    res.sendStatus( 404 );
  });
}); // GET /artists

// CRUD show
app.get('/artists/:id', (req, res) => {
  Artist.findOne({ _id: req.params.id })
    .then( artist => {
      res.json( artist );
    })
    .catch( err => {
      // TODO: actually check what the error is and
      // respond uniquely to specific errors
      console.log('findOne() query error', err.message );
      res.sendStatus( 422 );
    });

}); // GET /artists/:id


const server = app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}/ ...`);
});

// Export the main app so we can require() it
// in our tests
module.exports = {
  app,    // for chai-http requests;
  server  // so we can close() after testing;
};
