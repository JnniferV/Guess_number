/** @type {import("mongoose").Model} */
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')

const findByEmail = async (email) => {
  return await User.findOne({ email: email })
}

const create = async (user) => {
  const newUser = new User(user)
  return await newUser.save()
}

const findAll = async () => {
  return await User.find()
}

module.exports = { findByEmail, create, findAll }
