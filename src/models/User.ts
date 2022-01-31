import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

async function hashPassword () {
  const user = this
  const SALT_FACTOR = 8

  if (!user.isModified('password')) {
    return
  }

  return bcrypt
    .genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => {
      user.password = hash
    })
}

const User = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true })

User.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password)
}

User.pre('save', hashPassword)

export default mongoose.model('User', User)
