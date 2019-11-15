const express = require('express')
const helmet = require('helmet')

const database = require('../database')

const auth = require('./auth')
const login = require('./login/routes')
const users = require('./users/routes')

const api = express()

api.use(helmet())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(auth.start())

api.use('/api/v1/login', login)
api.use('/api/v1/users', users)

module.exports = {
  start () {
    return new Promise(resolve => {
      database()
        .then(() => {
          api.listen(3000, () => {
            console.log('API listening on port 3000...')
            resolve(api)
          })
        })
    })
  }
}
