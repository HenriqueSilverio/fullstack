const to = require('../../lib/await-to')

const User = require('./model')

function deny (req, res, next) {
  return res.status(401).json({ errors: [ { title: 'Unauthorized' } ] })
}

const actions = {
  async show (req, res, next) {
    const [ error, user ] = await to(User.findById(req.params.id))
    if (error || !user) {
      return deny(req, res, next)
    }
    if (req.user.role === 'admin') {
      req.resource = user
      return next()
    }
    if (req.user.id !== user.id) {
      return deny(req, res, next)
    }
    req.resource = user
    next()
  }
}

function authorize (action) {
  return actions[action] || deny
}

module.exports = { authorize }
