
const express = require('express');
const app = express();

const tweetStream = require('./tweetstream');

// Serve static files directly from the public/ folder
app.use( express.static('public') );

const server = app.listen(3000, () => {
  console.log('HTTP server listening on http://localhost:3000 ...');
});

// Load the websockets library, and tell it which server to use for websocket connections

// const setup = require('socket.io');
// const io = setup( server );
const io = require('socket.io')( server );

io.on('connection', socket => {

  // Do something whenever a client connects via the browser
  // 'socket' is how we talk to the client that has just connected


  // setInterval( () => {
  //   socket.emit('hello', { message: 'Welcome to your websockets connection' });
  // }, 2000);

  // Broadcast to every ws client that someone has connected
  io.emit('joined', {
    content: 'User has joined!',
    socketID: socket.conn.id
  });

  // Listen for 'welcome' events coming from a connected client
  socket.on('welcome', data => {
    console.log('Got "welcome" message', data);
  });

  tweetStream.on('data', tweet => {
    console.log('Got a new tweet:', tweet.text);
    socket.emit('tweet', tweet);
  });


}); // io.on('connect')
