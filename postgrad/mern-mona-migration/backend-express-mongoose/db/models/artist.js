
const mongoose = require('mongoose');

const Artist = mongoose.model(

  // arg 1: Name of model
  'Artist',

  // arg 2: schema
  new mongoose.Schema({
    // fields of the model are defined here;
    // we need to define the type of each field,
    // using type names that come from Mongoose
    name: String,
    nationality: String,
    dob: Date,
    // dob: {
    //   type: Date,
    //   // Do validations on the dates entered:
    //   // only allow a certain range of dates
    //   min: '1900-01-01',
    //   max: '1999-12-31'
    // }
    period: String,
    image: String,
    // roundness: Number,
    roundness: { type: Number, min: 1, max: 10 },
    bio: String

  })

);

// export the model we just created
module.exports = Artist;
