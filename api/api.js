import express from 'express'

import auth from './auth'
import users from './users/routes'
import products from './products/routes'

const api = express()

api.use(express.json())
api.use(express.urlencoded({extended: true }))
api.use(auth.start())

users(api)
products(api)

export default () => {
  api.listen(3001, () => console.log('API listening on port 3001...'))
}
