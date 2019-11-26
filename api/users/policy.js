const createError = require('http-errors')

const User = require('./model')

async function deny (req, res, next) {
  throw createError(403)
}

const actions = {
  async show (req, res, next) {
    const user = await User.findById(req.params.id)
    if (!user) {
      return deny()
    }
    if (req.user.role === 'admin') {
      req.resource = user
      return next()
    }
    if (req.user.id !== user.id) {
      return deny()
    }
    req.resource = user
    next()
  }
}

function authorize (action) {
  return actions[action] || deny
}

module.exports = { authorize }
