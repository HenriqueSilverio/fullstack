import jwt from 'jsonwebtoken'

import to from '../../lib/await-to'

import User from '../users/model'

export default (api) => {
  api.route('/api/login')
    .post(async (req, res) => {
      if (req.body.email && req.body.password) {
        const [ findError, user ] = await to(User.findOne({ email: req.body.email }, { password: 1 }))
        if (findError || !user) {
          return res.sendStatus(401)
        }
        const [ matchError, match ] = await to(user.checkPassword(req.body.password))
        if (matchError || !match) {
          return res.sendStatus(401)
        }
        return res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' }) })
      }
      return res.sendStatus(401)
    })
}
