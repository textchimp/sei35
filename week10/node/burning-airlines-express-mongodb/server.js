
const express = require('express');
const app = express();
const PORT = 1337;

const cors = require('cors');
app.use( cors() );  // Use cors package as middleware, i.e. add the CORS allow response header

app.use( express.json() ); // Enable support for JSON-encode request bodies (formdata)


// GraphQL server setup
const expressGraphql  = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL example using fake hardcoded 'students' DB
//
// const schema = buildSchema(`
//   type Query {
//     student(name: String): Student,
//
//     students(roundness: Int): [Student]
//   },
//
//   type Student {
//     name: String,
//     roundness: Int
//   }
// `);
//
// const getStudent = (query) => {
//   console.log( 'query:', query );
//
//   const students = [
//     {
//       name: 'Felix',
//       roundness: 7,
//     },
//     {
//       name: 'Deirdre',
//       roundness: 7,
//     },
//     {
//       name: 'Clarence',
//       roundness: 9,
//     },
//   ];
//
//   return students.find( s => s.name === query.name );
//
// };
//
// const getStudents = (query) => {
//   // Actually does the work of querying a database to return the students
//   const students = [
//     {
//       name: 'Felix',
//       roundness: 7,
//     },
//     {
//       name: 'Deirdre',
//       roundness: 7,
//     },
//     {
//       name: 'Clarence',
//       roundness: 9,
//     },
//   ];
//
//   if( query.roundness ){
//     return students.filter( s => s.roundness === query.roundness );
//   } else {
//     return students;
//   }
//
// };
//
// // Root resolver:
// const rootResolver = {
//   students: getStudents,
//   student:  getStudent
// };

const getFlights = () => {

  // Here getFlights() immediately returns a Promise object,
  // which we pass a callback function into. This function takes two
  // arguments, 'resolve' and 'reject'. These are themselves functions
  // which you call, and pass data into, when the promise code either
  // succeeds (resolve) or fails (reject).
  // What are these resolve and reject functions? Turns out they're
  // the functions passed into a .then() if one is chained to this
  // promise (resolve), or into a .catch() chained to it (reject).
  // In other words, if you had attached
  //    .then( data => console.log(data) )
  // to this returned promise, then when you call 'resolve(result);'
  // from here, the .then() callback will get 'result' as its 'data'
  // argument and log it out. MIND BLOWN.
  //
  // PS, it's only acceptable to return a Promise from our getFlights() resolver
  // function because the GraphQL root resolver accepts actual data (like an
  // array of objects) or a Promise, i.e. it expects this kind of return value
  // as valid. And it's the GraphQL library that is calling .then() on this
  // returned promise, somewhere internally, so it can finally forward the
  // data to the frontend.

  return new Promise( (resolve, reject) => {

    db.collection('flights').find( {} ).toArray( (err, result) => {
      if( err ){
        // TODO: tell the browser about the error
        //return console.log( 'Error:', err );
        return reject( err );
      }

      // res.json( result );  // This worked as an Express response

      // return result;  // This worked for our fake DB result
      // ☝️
      // Nope! This returns result from the DB query callback,
      // NOT from the outer 'getFlights' functions as we need it to.
      //
      // WTF are we supposed to do? Promises to the rescue!

        resolve( result );

    }); // find()

  }); // new Promise

}; // getFlights()


const schema = buildSchema(`
  type Query {
    flights: [Flight]
  },
  type Flight {
    flight_number: String,
    origin: String,
    destination: String,
    reservations: [Reservation]
  },
  type Reservation {
    row: Int,
    col: Int
  }
`);

const rootResolver = {
  flights: getFlights
}

app.use('/graphql', expressGraphql({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true
}));


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

      // broadcast that a new reservation has been made


    }

  ); // updateOne()

}); // POST /reservations


const server = app.listen(PORT, () =>  console.log(`Server listening at http://localhost:${PORT} ...`) );

const io = require('socket.io')( server );

io.on('connection', socket => {

  console.log('Got new connection!');

  setInterval( () => {
    socket.emit('ping', { msg: 'hi there!' });
  }, 2000 );

});
