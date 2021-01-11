'use strict'

const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router
  .get('/health-check', async (ctx) => {
    const state = mongoose.connection.readyState
    // When state === 0, it means the connection is disconnected
    if (!state) {
      throw new Error('connection to mongodb is broken')
    }

    ctx.status = 204
    ctx.body = null
  })


module.exports = router
