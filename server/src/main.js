/**
 * Entry file
 */
'use strict';

const http = require('http');
// const https = require('https');
const koa = require('koa');
const cors = require('@koa/cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/snapshot', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// Populate databases with sample data
require('./config/seed');

// Setup server
const app = new koa();

http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);

// TODO: Cross Origin Resource Sharing
app.use(cors());

// Routing
require('./routes')(app);