/**
 * Populate DB with sample data on server start
 */

'use strict'
const Thing = require('../api/thing/thing.model')
const User = require('../api/user/user.model')

const seeding = async() => {
  await Thing.collection.remove()
  await Thing.create(
    { name: 'Our first Koa and Node app', info: 'Lightweight server' },
    { name: 'Mongo is here', info: 'We use mongodb to store data!' }
  )
  await User.collection.remove()
  await User.create({
    name: 'tester',
    email: 'test@example.com',
    password: 'helloworld',
    role: 'user'
  })
  await User.create({
    name: 'admin',
    email: 'admin@example.com',
    assword: 'admini',
    role: 'admin'
  })
  console.log('Finish populating database')
}

seeding()