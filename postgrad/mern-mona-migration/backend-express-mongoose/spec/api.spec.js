// Set an environment variable which will be used to tell the
// server that it is running in test mode, and should use a
// test database instead of the development database
process.env.NODE_ENV = 'test';


const chai = require('chai');
const { expect } = chai;  //  const expect = chai.expect;

const chaiHTTP = require('chai-http');
chai.use( chaiHTTP );  // use the http library as a chai plugin

// Load our Express server to make test requests to
const express = require('../server');

const mongoose = require('mongoose');
const Artist = require('../db/models/artist');

describe('Express API endpoints', () => {

  // let res;
  const testArtists = [
    {
      name: 'Artist 1',
      nationality: 'A',
      dob: '2000-01-01',
      period: 'B',
      image: 'C',
      roundness: 1,
      bio: 'D'
    },
    {
      name: 'Artist 2',
      nationality: 'AA',
      dob: '2000-01-02',
      period: 'BB',
      image: 'CC',
      roundness: 2,
      bio: 'DD'
    },
  ];

  // Run this code once before running the examples below
  // (within this describe block)
  before( done => {

    // To ensure our tests run in a 'blank slate' predictable
    // environment, preemptively delete everything from the test
    // DB artist collection (table), and then add some test data
    Artist.deleteMany({})
      .then( () => {
        // everything has been deleted, safe to add test data
        return Artist.create( testArtists );
      })
      .then( () => done() ); // 2nd then

  }); // before


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
    express.server.close();
  });

  // Smoke test: does the server work at all, or not?
  describe('GET /', () => {

    it('responds to a basic request to /', done => {
      // Make an HTTP request, and check the response
      chai.request( express.app ).get('/')
        .end( (err, res) => {

          if( err ){
            return done( err ); // exit with error!
          }

          // Assert: check that the HTTP code is 200
          // expect( res.statusCode ).to.equal( 200 );
          expect( res ).to.have.status( 200 );

          done();  // we are finished, continue to next test

        });

    });

  });  // GET to /

  // CRUD index
  describe('GET /artists', () => {

    let res;
    before( done => {
      // artist documents have been created, safe to make server request
      chai.request( express.app ).get('/artists')
      .end( (err, response) => {
        if( err ) return done( err );
        res = response; // make the response variable available to the following tests
        done(); // Let the testing system know it can now run the it() tests
      }); // request

    });

    it('responds with status 200', () => {
      expect( res ).to.have.status( 200 );
    });

    it('returns a JSON array', () => {
      // console.log( 'body:', res.body );
      expect( res.body ).to.be.an( 'array' );
    });

    it('returns a list of artists', () => {
      // console.log( 'body:', res.body );
      expect( res.body.length ).to.equal( testArtists.length );
    });

    it('returns the correct fields for each artist', () => {
      expect( res.body[0] ).to.contain.keys( 'name', 'nationality', 'dob', 'period', 'image', 'roundness', 'bio' );
      expect( res.body[1] ).to.contain.keys( 'name', 'nationality', 'dob', 'period', 'image', 'roundness', 'bio' );
    });

    it('returns the correct values for the artists fields', () => {
      const a1 = res.body[0];
      expect( a1.name ).to.equal( testArtists[0].name );
      expect( a1.nationality ).to.equal( testArtists[0].nationality );
      expect( a1.period ).to.equal( testArtists[0].period );
      // expect( a1.dob ).to.equal( testArtists[0].dob ); // TODO: work out how to compare dates
      expect( a1.image ).to.equal( testArtists[0].image );
      expect( a1.roundness ).to.equal( testArtists[0].roundness );
      expect( a1.bio ).to.equal( testArtists[0].bio );
    });

    // TODO: check that errors are handled gracefully

  });

  // CRUD show
  describe('GET /artists/:id', () => {

    let res;
    before( done => {

      // We need to query MongoDB to get the ID of the first artist
      // to use in the URL of our request
      Artist.findOne()
        .then( artist => {
          chai.request( express.app ).get(`/artists/${ artist._id }`)
          .end( (err, response) => {
            if( err ) return done( err );
            res = response; // make the response variable available to the following tests
            done(); // Let the testing system know it can now run the it() tests
          }); // request
        });

    }); // before

    it('responds with a status of 200', () => {
      expect( res ).to.have.status( 200 );
    });

    it('should return a JSON object with the correct fields', () => {
      expect( res.body ).to.not.equal( null );
      expect( res.body ).to.be.an( 'object' );
      expect( res.body ).to.contain.keys( 'name', 'nationality', 'dob', 'period', 'image', 'roundness', 'bio' );
    });

    it('returns the correct values for the artist fields', () => {
      const a1 = res.body;
      expect( a1.name ).to.equal( testArtists[0].name );
      expect( a1.nationality ).to.equal( testArtists[0].nationality );
      expect( a1.period ).to.equal( testArtists[0].period );
      // expect( a1.dob ).to.equal( testArtists[0].dob ); // TODO: work out how to compare dates
      expect( a1.image ).to.equal( testArtists[0].image );
      expect( a1.roundness ).to.equal( testArtists[0].roundness );
      expect( a1.bio ).to.equal( testArtists[0].bio );
    });

    it('returns a 422 Unprocessable Entity error for bad IDs', done => {

      chai.request( express.app ).get(`/artists/chicken`)
      .end( (err, response) => {
        if( err ) return done( err );
        expect( response ).to.have.status( 422 );
        done();
      }); // request

    });


  }); // GET /artists/:id


}); // API
