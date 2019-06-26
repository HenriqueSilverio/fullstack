import mongoose from 'mongoose'

export default () => {
  const db = mongoose.connection
  const options = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
  db.on('error', console.error.bind(console, 'Connection error:'))
  db.once('open', () => console.log('Connected to database!'))
  return mongoose.connect('mongodb://localhost/api', options)
}
