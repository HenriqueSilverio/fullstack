const { Router } = require('express')

const to = require('../../lib/await-to')

const auth = require('../auth')
const User = require('./model')
const policy = require('./policy')

const router = Router()

router.route('/')
  .post(async (req, res) => {
    const model = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
    const [error, user] = await to(model.save())
    if (error) {
      return res.status(400).json({ errors: [{ title: error.errmsg }] })
    }
    return res.json({ data: user.toObject() })
  })
  .get(auth.authenticate(), auth.authorize(), async (req, res) => {
    const [error, users] = await to(User.find())
    if (error) {
      return res.status(400).json({ errors: [{ title: error.errmsg }] })
    }
    return res.json({ data: users.map(user => user.toObject()) })
  })

router.route('/:id')
  .get(auth.authenticate(), auth.authorize(), policy.authorize('show'), async (req, res) => {
    return res.json({ data: req.resource.toObject() })
  })

module.exports = router
