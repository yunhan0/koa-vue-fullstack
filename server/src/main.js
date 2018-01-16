/**
 * Entry file
 */
'use strict';

const http = require('http');
const https = require('https');
const koa = require('koa');
const koaRouter = require('koa-router');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/snapshot', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// Populate databases with sample data

// Setup server
const app = new koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);

// let router = new koaRouter();

// router.get('/', (ctx, next) => {
//   ctx.body = "Hello world";
// });

// app
//   .use(router.routes())
//   .use(router.allowedMethods());
