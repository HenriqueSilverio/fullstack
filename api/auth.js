import passport from 'passport'
import passportJwt from 'passport-jwt'
import acl from 'express-acl'

import to from '../lib/await-to'
import User from './users/model'

const { Strategy, ExtractJwt } = passportJwt

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(options, async (payload, done) => {
  const [ error, user ] = await to(User.findById(payload.id))
  if (error || !user) {
    return done(error, null)
  }
  return done(null, {
    id: user.id,
    role: user.role
  })
})

passport.use(strategy)

acl.config({
  baseUrl: 'api/v1',
  decodedObjectName: 'user',
  filename: 'roles.json',
  path: 'api',
  denyCallback: (res) => {
    return res.status(403).json({
      errors: [ { title: 'Forbidden' } ]
    })
  }
})

export default {
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
