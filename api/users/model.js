import mongoose from 'mongoose'

const { model, Schema } = mongoose

const User = model('User', new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true }))

export default User
