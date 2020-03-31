
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

// Artist.collection.drop().then( () => {
//
//   Artist.create([
//     {
//       name: 'Max Ernst',
//       nationality: 'German',
//       dob: '1891-04-02',
//       period: '20th c.',
//       image: 'http://www.fillmurray.com/300/300',
//       roundness: 7,
//       bio: 'Surrealist'
//     },
//     {
//       name: 'Lee Kranser',
//       nationality: 'USA',
//       dob: '1908-10-27',
//       period: '20th c.',
//       image: 'https://i.pinimg.com/736x/05/62/14/0562148ce05f206e7ad773dc65d565bc--lee-krasner-abstract-expressionism.jpg',
//       roundness: 8,
//       bio: 'Abstract Expressionist'
//     },
//     {
//       name: 'Frantisek Kupka',
//       nationality: 'Czech',
//       dob: '1871-09-23',
//       period: '20th c.',
//       image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Frantisek_Kupka_1928.jpg',
//       roundness: 5,
//       bio: 'Vorticist/Abstract'
//     },
//   ])
//   .then( artists => {
//     console.log('Created artist:', artists);
//     process.exit(0);
//   });
//
// });

Artist.collection.drop()
.then( () => {
  return Artist.create([
    {
      name: 'Max Ernst',
      nationality: 'German',
      dob: '1891-04-02',
      period: '20th c.',
      image: 'http://www.fillmurray.com/300/300',
      roundness: 7,
      bio: 'Surrealist'
    },
    {
      name: 'Lee Kranser',
      nationality: 'USA',
      dob: '1908-10-27',
      period: '20th c.',
      image: 'https://i.pinimg.com/736x/05/62/14/0562148ce05f206e7ad773dc65d565bc--lee-krasner-abstract-expressionism.jpg',
      roundness: 8,
      bio: 'Abstract Expressionist'
    },
    {
      name: 'Frantisek Kupka',
      nationality: 'Czech',
      dob: '1871-09-23',
      period: '20th c.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Frantisek_Kupka_1928.jpg',
      roundness: 5,
      bio: 'Vorticist/Abstract'
    },
  ]);
})
.then( artists => {
  // This then() is actually responding to the
  // Promise given by Artist.create(), inside
  // the .then() callback for drop() 😮
  // i.e. ONLY after the collection was
  // dropped, should we proceed to create
  // the new entries to re-populate it
  console.log('Created artist:', artists);
  process.exit(0);
});

// ; // .drop().then()
