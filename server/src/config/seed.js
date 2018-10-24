/**
 * Populate DB with sample data on server start
 */

'use strict'
const Thing = require('../api/thing/thing.model')
const User = require('../api/user/user.model')

const seeding = async() => {
  await Thing.collection.deleteMany()
  await Thing.create(
    { name: 'Our first Koa and Node app', info: 'Lightweight server' },
    { name: 'Mongo is here', info: 'We use mongodb to store data!' }
  )
  await User.collection.deleteMany()
  await User.create({
    name: 'tester',
    email: 'test@example.com',
    password: 'helloworld',
    role: 'user'
  })
  await User.create({
    name: 'admin',
    email: 'admin@example.com',
    password: 'admini',
    role: 'admin'
  })
  console.log('Finish populating database')
}

seeding()
