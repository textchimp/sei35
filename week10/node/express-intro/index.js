const axios = require('axios');
const express = require('express');
const ejs = require('ejs');
const app = express();  // create the server
const PORT = process.argv[2] || 1337;

// Pass through files in this folder directly
app.use( express.static('public') );

app.set('view-engine', ejs);

// Route handler for a GET request to /
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/guestbook', (req, res) => {
  res.send('<h1>Sign My Guestbook!!1!</h1><br><img src="http://www.fillmurray.com/600/400">');
});

// Dynamic URLs
app.get('/hello/:person', (req, res) => {
  console.log( req.params );

  // res.send(`Hello, ${ req.params.person }`);

  res.render('greeting.ejs', { name: req.params.person });

});

// Dynamic URL, multiple variables
app.get('/hello/:person/favourite/:food', (req, res) => {
  console.log( req.params );
  res.send(`Hello, ${ req.params.person }<br>Your favourite food is ${ req.params.food }`);
});


// Sending a JSON response
app.get('/dogs.json', (req, res) => {
  const data = [
    { name: 'Ruby', age: 3, goodBoy: true },
    { name: 'Fido', age: 4, goodBoy: true },
    { name: 'Killer', age: 2 , goodBoy: false },
  ];
  res.json( data );
});

// Query a remote API and forward the response to the browser
app.get('/trivia', (req, res) => {
  axios.get('http://numbersapi.com/random/trivia?json')
    .then( axiosResponse => {
      res.json( axiosResponse.data );
    });
    // .catch();
});


// Fallback route handler: sends 404 status in response
// but only if the request fails to match any
// of the above route handlers
app.use( (req,  res) => {
  res.sendStatus(404);
});

// Start listening
app.listen(PORT, () => console.log(`Now serving on http://localhost:${PORT} ...`) );
