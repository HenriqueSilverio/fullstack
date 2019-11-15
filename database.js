const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const getConnectionString = {
  async test () {
    const server = new MongoMemoryServer()
    return server.getConnectionString()
  },
  default () {
    const DB_USER = process.env.DB_USER || ''
    const DB_PASS = process.env.DB_PASS || ''
    const DB_HOST = process.env.DB_HOST || 'localhost'
    const DB_PORT = process.env.DB_PORT || '27017'
    const DB_NAME = process.env.DB_NAME || 'api'
    const credentials = DB_USER && DB_PASS ? `${DB_USER}:${DB_PASS}@` : ''
    return `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`
  }
}

module.exports = async () => {
  const uri = await getConnectionString[process.env.NODE_ENV || 'default']()
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  mongoose.connection.on('error', console.error.bind(console, 'Connection error:'))
  mongoose.connection.once('open', () => console.log('Connected to database!'))
  return mongoose.connect(uri, options)
}
