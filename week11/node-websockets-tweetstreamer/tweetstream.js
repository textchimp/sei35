
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var stream = client.stream('statuses/filter', {track: 'javascript'});

// stream.on('data', function(event) {
//   console.log(event && event.text);
// });

stream.on('error', function(error) {
  console.log('PROBLEM!');
  throw error;
});

// Export the stream object so it can be require()'d
// anywhere!
module.exports = stream;
