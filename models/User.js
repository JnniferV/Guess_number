const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    uuid: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  }),
)

module.exports = User
