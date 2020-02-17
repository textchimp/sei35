
const http = require('http'); // Node builtin library, no need for 'npm install...'

http.createServer( (req, res) => {

  // This code runs every time a request reaches the server:
  console.log(`Serving request: ${ req.method }  ${ req.url }`);

  res.writeHeader( 200, { 'Content-Type': 'text/html' } );

  // res.write('hi');
  // res.end(`Hello World! You asked for ${req.url}`);

  // Routing! Tedious to hand-write.
  if( req.url === '/' ){
    res.end('<h1>Hello World!</h1>');
  } else if( req.url === '/dogs' ){
    res.end('Info about dogs here');
  } else if( req.url === '/guestbook' ){
    res.end('Please sign my guestbook!!!!111!!');
  }



}).listen(1337); // Actually start listening for requests on this port number

console.log('Server is running at http://localhost:1337 ...');
