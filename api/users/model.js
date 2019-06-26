import mongoose from 'mongoose'

const { model, Schema } = mongoose

const User = model('User', new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    select: false
  }
}, {
  timestamps: true,
  toObject: {
    getters: true,
    transform (doc, ret) {
      delete ret._id
      delete ret.password
      delete ret.__v
      return ret
    }
  }
}))

export default User
