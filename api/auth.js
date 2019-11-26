const acl = require('express-acl')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const User = require('./users/model')

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
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      req.user = user
      next()
    } catch (error) {
      if (error) throw createError(403)
    }
  },
  async authorize (req, res, next) {
    return acl.authorize(req, res, next)
  }
}

module.exports = {
  authenticate () {
    return Gate.authenticate
  },
  authorize () {
    return Gate.authorize
  }
}
