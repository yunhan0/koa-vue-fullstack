'use strict';

const mongoose = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
var thingSchema = mongoose.Schema({
    name: String,
    info: String
});

// Compiling our schema into a Model.
module.exports = mongoose.model('Thing', thingSchema);