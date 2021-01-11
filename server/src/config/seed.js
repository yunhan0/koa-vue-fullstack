/**
 * Populate DB with sample data on server start
 */

'use strict'
const Thing = require('../api/thing/thing.model')
const User = require('../api/user/user.model')

const seeding = async() => {
  let numberOfThings = await Thing.countDocuments()
    // populate initial things if nothing is in the database
  if (numberOfThings == 0) {
    await Thing.create({
      name: 'Our first Koa and Node app', info: 'Lightweight server'
    }, {
      name: 'Mongo is here', info: 'We use mongodb to store data!'
    })
    console.log('Finish populating database - things')
  }

  let numberOfUsers = await User.countDocuments()
  // populate initial users if no user is in the database
  if (numberOfUsers == 0) {
    await User.create({
      name: 'tester',
      email: 'test@example.com',
      password: 'helloworld',
      role: 'user'
    })
    await User.create({
      name: 'admin',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin'
    })
    console.log('Finish populating database - users')
  }
}

seeding()
