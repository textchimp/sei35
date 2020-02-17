
const express = require('express');
const app = express();
const PORT = 1337;

const cors = require('cors');
app.use( cors() );  // Use cors package as middleware, i.e. add the CORS allow response header

app.use( express.json() ); // Enable support for JSON-encode request bodies (formdata)


const MongoClient = require('mongodb').MongoClient;
let db; // global var to store the db connection object

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if( err ) {
    console.log(err);
    return;  // early return on error
  }

  const dbName = 'ba';
  console.log( 'Using database:', dbName );
  db = client.db( dbName ); // success!

});


app.get('/flights', (req, res) => {

  // Get all the flights in the collection, and render them to the browser as JSON
  db.collection('flights').find( {} ).toArray( (err, result) => {
    if( err ){
      // TODO: tell the browser about the error
      return console.log( 'Error:', err );
    }

    // console.log( 'result:', res );
    res.json( result );

  }); // find()

}); //  GET /flights


app.get('/flights/search/:origin/:destination', (req, res) => {

  const {origin, destination} = req.params;  // ES6 destructuring

  db.collection('flights').find({ origin, destination }).toArray( (err, results) => {

    if( err ){
      return console.log('Search error:', err);
    }

    res.json( results );

  }); // find()

}); // /GET /flights/search

app.get('/flights/:flight_number', (req, res) => {

  db.collection('flights').findOne({ flight_number: req.params.flight_number }, (err, result) => {

    if( err ){
      return console.log('Flight find error', err );
    }


    const reservations = {};
    result.reservations.forEach( r => reservations[`${r.row}-${r.col}`] = 1 );

    // Construct a response object that has the same shape as the Rails response
    // that the Vue axios .then code is expecting
    const response = {
      flight: result,
      reservations, // shortcut for reservations: reservations
      user_reservations: {}  // No user system for now
    };


    res.json( response );

  }); // findOne()

}); // GET /flights/:id


app.post('/reservations', (req, res) => {

  console.log( req.body );

  db.collection('flights').updateOne(

    // Find the document you want to update:
    { flight_number: req.body.flight_id },

    // Specify the new fields for the document
    {
      $push: {              // append to the reservations array, don't overwrite it
        reservations: {
          row: req.body.row,
          col: req.body.col,
          user_id: req.body.user_id  // NOPE WRONG NO
        }
      }
    },

    // callback to run when the update is finished
    ( err, result) => {

      if( err ){
        return console.log('Reservation create error', err );
      }

      res.json({
        row: req.body.row,
        col: req.body.col,
      });

    }

  ); // updateOne()

}); // POST /reservations


app.listen(PORT, () =>  console.log(`Server listening at http://localhost:${PORT} ...`) );
