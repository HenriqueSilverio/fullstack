const jwt = require('jsonwebtoken')
const { Router } = require('express')
const { addAsync } = require('@awaitjs/express')

const to = require('../../lib/await-to')

const User = require('../users/model')

const router = Router()

addAsync(router.route('/'))
  .postAsync(async (req, res) => {
    if (req.body.email && req.body.password) {
      const [findError, user] = await to(User.findOne({ email: req.body.email }, { password: 1 }))
      if (findError || !user) {
        return res.status(401).json({ errors: [{ title: 'Unauthorized' }] })
      }
      const [matchError, match] = await to(user.checkPassword(req.body.password))
      if (matchError || !match) {
        return res.status(401).json({ errors: [{ title: 'Unauthorized' }] })
      }
      return res.json({
        data: {
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' })
        }
      })
    }
    return res.status(401).json({ errors: [{ title: 'Unauthorized' }] })
  })

module.exports = router
