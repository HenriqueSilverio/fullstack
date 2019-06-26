import bcrypt from 'bcrypt'

import to from '../../lib/await-to'

import auth from '../auth'
import User from './model'

export default (api) => {
  api.route('/api/users')
    .post(async (req, res) => {
      const [ hashError, hash ] = await to(bcrypt.hash(req.body.password, 10))
      if (hashError) {
        return res.json({ 'error': 'Cannot CREATE user.' })
      }
      const model = new User({
        'email': req.body.email,
        'password': hash
      })
      const [ saveError, user ] = await to(model.save())
      if (saveError) {
        return res.json({ 'error': 'Cannot CREATE user.' })
      }
      return res.json(user.toObject())
    })
    .get(auth.authenticate(), async (req, res) => {
      const [ error, users ] = await to(User.find())
      if (error) {
        return res.json({ 'error': 'Cannot GET users.' })
      }
      return res.json(users.map(user => user.toObject()))
    })
}
