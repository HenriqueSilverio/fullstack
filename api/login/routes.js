const jwt = require('jsonwebtoken')
const { Router } = require('express')
const createError = require('http-errors')
const { addAsync } = require('@awaitjs/express')

const User = require('../users/model')

const router = Router()

addAsync(router.route('/'))
  .postAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      throw createError(401)
    }
    const user = await User.findOne({ email }, { password: 1 })
    if (!user) {
      throw createError(401, `User ${email} not found.`)
    }
    const match = await user.checkPassword(password)
    if (!match) {
      throw createError(401, 'Invalid email or password.')
    }
    return res.json({
      data: {
        token: jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
      }
    })
  })

module.exports = router
