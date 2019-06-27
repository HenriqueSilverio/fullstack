import passport from 'passport'
import passportJwt from 'passport-jwt'

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
    email: user.email
  })
})

passport.use(strategy)

export default {
  start () {
    return passport.initialize()
  },
  authenticate () {
    return passport.authenticate('jwt', { session: false })
  }
}
