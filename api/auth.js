const createError = require('http-errors')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const acl = require('express-acl')

const User = require('./users/model')

const { Strategy, ExtractJwt } = passportJwt

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)
    if (!user) {
      return done(null, false)
    }
    return done(null, {
      id: user.id,
      role: user.role
    })
  } catch (error) {
    return done(error, false)
  }
})

passport.use(strategy)

acl.config({
  baseUrl: 'api/v1',
  decodedObjectName: 'user',
  filename: 'roles.json',
  path: 'api',
  denyCallback: (res) => {
    throw createError(403)
  }
})

module.exports = {
  start () {
    return passport.initialize()
  },
  authenticate () {
    return passport.authenticate('jwt', { session: false })
  },
  authorize () {
    return acl.authorize
  }
}
