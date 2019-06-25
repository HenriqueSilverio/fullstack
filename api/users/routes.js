import to from '../../lib/await-to'

import auth from '../auth'
import User from './model'

export default (api) => {
  api.route('/api/users')
    .all(auth.authenticate())
    .get(async (req, res) => {
      const [ error, users ] = await to(User.find())
      if(error) {
        res.json({ 'error': 'Cannot GET users.' })
      }
      res.json(users)
    })
    .post(async (req, res) => {
      const model = new User({
        'email': req.body.email,
        'password': req.body.password
      })
      const [ error, user ] = await to(model.save())
      if(error) {
        res.json({ 'error': 'Cannot CREATE user.' })
      }
      res.json(user)
    })

  api.route('/api/users/:id')
    .all(auth.authenticate())
    .get(async (req, res) => {
      const [ error, user ] = await to(User.findById(req.params.id))
      if(error) {
        res.json({ 'error': 'User not found.' })
      }
      res.json(user)
    })
    .put(async (req, res) => {
      const id = req.params.id
      const data = { 'email': req.body.email, 'password': req.body.password }
      const [ error, user ] = await to(User.findByIdAndUpdate(id, data, { 'new': true }))
      if(error) {
        res.json('Cannot UPDATE user.')
      }
      res.json(user)
    })
    .delete(async (req, res) => {
      const [ error, user ] = await to(User.findByIdAndRemove(req.params.id))
      if(error) {
        res.json({ 'error': 'Cannot DELETE user.' })
      }
      res.json(user)
    })
}
