const database = require('./database')
const api = require('./api/api')

;(async () => {
  await database()
  api()
})()
