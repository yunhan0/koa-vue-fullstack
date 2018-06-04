'use strict'

const mongoose = require('mongoose')

// With Mongoose, everything is derived from a Schema. 
var thingSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  info: String
})

// Compiling our schema into a Model.
module.exports = mongoose.model('Thing', thingSchema)