const bcrypt = require('bcrypt')
const { model, Schema } = require('mongoose')

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
    minlength: 6,
    required: true,
    trim: true,
    select: false
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 45
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
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.method('checkPassword', function (password) {
  return bcrypt.compare(password, this.password)
})

module.exports = model('User', UserSchema)
