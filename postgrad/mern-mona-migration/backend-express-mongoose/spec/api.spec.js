
const chai = require('chai');
const { expect } = chai;  //  const expect = chai.expect;

const chaiHTTP = require('chai-http');
chai.use( chaiHTTP );  // use the http library as a chai plugin

// Load our Express server to make test requests to
const server = require('../server');

const mongoose = require('mongoose');

describe('Express API endpoints', () => {

  // This after 'hook' runs after all tests are finished, allowing
  // you to perform any cleanup tasks
  // Here we need to reset the mongoose models so we don't
  // get that error when we re-run our tests in watch mode
  after( () => {
    // Reset the Mongoose state, for next test run
    // (otherwise we get that 'cannot overwrite' error);
    // Can you fucking believe we have to do this?!
    mongoose.models = {};
    mongoose.modelSchemas = {};
    // mongoose.connection.close();

    // Stop the Express server, ready for the next run to start it
    server.close();
  });


  describe('GET /', () => {

    it('responds to a basic request to /', done => {
      // Make an HTTP request, and check the response
      chai.request( server ).get('/')
        .end( (err, res) => {

          if( err ){
            return done( err ); // exit with error!
          }

          console.log( 'response', res.text );
          done();  // we are finished, continue to next test

        });

    });

  });  // GET to /


}); // API
