import mongoose from 'mongoose'

const DB_USER = process.env.DB_USER || ''
const DB_PASS = process.env.DB_PASS || ''
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'api'

export default () => {
  const db = mongoose.connection
  const credentials = DB_USER && DB_PASS ? `${DB_USER}:${DB_PASS}@` : ''
  const uri = `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`
  const options = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
  db.on('error', console.error.bind(console, 'Connection error:'))
  db.once('open', () => console.log('Connected to database!'))
  return mongoose.connect(uri, options)
}
