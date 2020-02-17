
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

  // How to remove all flights first??????
  db.collection('flights').deleteMany({}, (err, res) => {

    if( err ){
      return console.log('Failed to delete all flights!', err);
    }

    console.log('Deleted all flights: ', res.deletedCount);

    db.collection('flights').insertMany( [
      {
        "flight_number": "123",
        "origin": "SYD",
        "destination": "SFO",
        "departure_date_formatted": new Date("2018-12-25T20:20:00Z"),
        "airplane": { "name": "757", "rows": 50, "cols": 8 },
        "reservations": [
          { "row":10, "col": 3 },
          { "row":11, "col": 2 }
        ]
      },
      {
        "flight_number": "456",
        "origin": "SYD",
        "destination": "SFO",
        "departure_date_formatted": new Date("2018-12-30T12:12:00Z"),
        "airplane": { "name": "737", "rows": 40, "cols": 4 },
        "reservations": [
          { "row":1, "col": 2, "passenger": { "name": "test guy", "email": "test@guy.com"} },
          { "row":2, "col": 3 }
        ]
      },
      {
        "flight_number": "789",
        "origin": "SYD",
        "destination": "SIN",
        "departure_date_formatted": new Date("2018-12-31T23:23:23Z"),
        "airplane": { "name": "757", "rows": 50, "cols": 8 },
        "reservations": [
          { "row":5, "col": 6 },
          { "row":5, "col": 7 }
        ]
      }
    ],
    (err, res) => {

      if( err ){
        return console.log('Error inserting flights:', err);
      }

      console.log(`Success! Added ${ res.insertedCount } flights.`);

      process.exit(0); // Quit the program!

    }); // insertMany()

  }); // deleteMany()

}); // connect()
