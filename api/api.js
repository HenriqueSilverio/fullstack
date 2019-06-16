import express from 'express'

import routes from './products/routes'

const api = express()

api.use(express.json())
api.use(express.urlencoded({extended: true }))

routes(api)

export default () => {
  api.listen(3001, () => console.log('API listening on port 3001...'))
}
