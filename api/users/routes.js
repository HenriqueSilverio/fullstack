import to from '../../lib/await-to'

import auth from '../auth'
import User from './model'

export default (api) => {
  api.route('/api/users')
    .post(async (req, res) => {
      const model = new User({
        'email': req.body.email,
        'password': req.body.password
      })
      const [ error, user ] = await to(model.save())
      if (error) {
        return res.json({ errors: [ { title: error.errmsg } ] })
      }
      return res.json({ data: user.toObject() })
    })
    .get(auth.authenticate(), async (req, res) => {
      const [ error, users ] = await to(User.find())
      if (error) {
        return res.json({ errors: [ { title: error.errmsg } ] })
      }
      return res.json({ data: users.map(user => user.toObject()) })
    })
}
