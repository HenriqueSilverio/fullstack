import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import to from '../../lib/await-to'

const { model, Schema } = mongoose

const UserSchema = new Schema({
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
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const [ hashError, hash ] = await to(bcrypt.hash(this.password, 10))
  if (hashError) {
    return next(hashError)
  }
  this.password = hash
  next()
})

UserSchema.method('checkPassword', async function (password) {
  const [ matchError, match ] = await to(bcrypt.compare(password, this.password))
  if (matchError || !match) {
    return false
  }
  return true
})

const UserModel = model('User', UserSchema)

export default UserModel
