/**
 * Main file after entry
 */
'use strict'

const http = require('http')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const config = require('./config')
// Connect to MongoDB
mongoose.connect(config.mongo.uri)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Database connected')
})

// Populate databases with sample data
require('./config/seed')

// Setup server
const app = new koa()
// Koa bodyparser
app.use(bodyParser())
// Security
require('./config/security')(app)
// Routing
require('./routes')(app)

http.createServer(app.callback()).listen(config.port)