const { Router } = require('express')
const { addAsync } = require('@awaitjs/express')

const auth = require('../auth')
const User = require('./model')
const policy = require('./policy')

const router = Router()

addAsync(router.route('/'))
  .postAsync(async (req, res) => {
    const { email, password, role } = req.body
    const model = new User({ email, password, role })
    const user = await model.save()
    return res.json({ data: user.toObject() })
  })
  .getAsync(auth.authenticate(), auth.authorize(), async (req, res) => {
    const users = await User.find()
    return res.json({ data: users.map(user => user.toObject()) })
  })

addAsync(router.route('/:id'))
  .getAsync(auth.authenticate(), auth.authorize(), policy.authorize('show'), async (req, res) => {
    return res.json({ data: req.resource.toObject() })
  })

module.exports = router
