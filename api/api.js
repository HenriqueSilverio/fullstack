import express from 'express'

import auth from './auth'
import login from './login/routes'
import users from './users/routes'

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(auth.start())

login(api)
users(api)

export default () => {
  api.listen(3001, () => console.log('API listening on port 3001...'))
}
