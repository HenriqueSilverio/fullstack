import database from './database'
import api from './api/api'

(async () => {
  await database()
  api()
})()
