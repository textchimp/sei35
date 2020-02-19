
console.log('hello w3rld!');

const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  console.log('Websockets connection established!');
});

// Listen for the server emitting 'hello' events
socket.on('hello', data => {
  console.log('HELLO message:', data);
});

socket.on('joined', data => {
  console.log('JOINED event', data);

  socket.emit('welcome', {
    text: 'Nice of you to join us'
  });

});


socket.on('tweet', data => {
  console.log('Got tweet', data);
})
