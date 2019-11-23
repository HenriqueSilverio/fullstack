const acl = require('express-acl')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

acl.config({
  baseUrl: 'api/v1',
  decodedObjectName: 'user',
  filename: 'roles.json',
  path: 'api',
  denyCallback: (res) => {
    throw createError(403)
  }
})

const Gate = {
  async authenticate (req, res, next) {
    const header = req.headers.authorization
    const token = header && header.split(' ')[1]
    if (!token) throw createError(401)
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) throw createError(403)
      req.user = user
      next()
    })
  }
}

module.exports = {
  authenticate () {
    return Gate.authenticate
  },
  authorize () {
    return acl.authorize
  }
}
