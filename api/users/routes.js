import to from '../../lib/await-to'

import auth from '../auth'
import User from './model'
import policy from './policy'

export default (api) => {
  api.route('/api/v1/users')
    .post(async (req, res) => {
      const model = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      })
      const [ error, user ] = await to(model.save())
      if (error) {
        return res.json({ errors: [ { title: error.errmsg } ] })
      }
      return res.json({ data: user.toObject() })
    })
    .get(auth.authenticate(), auth.authorize(), async (req, res) => {
      const [ error, users ] = await to(User.find())
      if (error) {
        return res.json({ errors: [ { title: error.errmsg } ] })
      }
      return res.json({ data: users.map(user => user.toObject()) })
    })

  api.route('/api/v1/users/:id')
    .get(auth.authenticate(), auth.authorize(), policy.authorize('show'), async (req, res) => {
      return res.json({ data: req.resource.toObject() })
    })
}
