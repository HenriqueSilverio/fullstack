const express = require('express')

const database = require('../database')

const auth = require('./auth')
const login = require('./login/routes')
const users = require('./users/routes')

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(auth.start())

login(api)
users(api)

module.exports = {
  instance: api,
  start () {
    return new Promise(async resolve => {
      await database()
      api.listen(3000, () => {
        console.log('API listening on port 3000...')
        resolve()
      })
    })
  }
}
