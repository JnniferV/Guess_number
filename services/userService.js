const userRepository = require('../repositories/userRepository')
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')

const connection = async (email, password) => {
  let errors = {}
  let user
  try {
    user = await userRepository.findByEmail(email)
  } catch (err) {
    errors.connexion = 'DB error'
    throw { errors, statusCode: 400 }
  }
  let isOk = !!user
  if (isOk) {
    isOk = await argon2.verify(user.password, password)
  }
  if (!isOk) {
    errors.connexion = 'Login/Password error'
    throw { errors, statusCode: 400 }
  }
  return user
}

const createUser = async (email, password) => {
  const hashPassword = await argon2.hash(password)

  let user = {
    uuid: uuidv4(),
    email: email,
    password: hashPassword,
    role: 'user',
  }

  let errors = {}
  if (user.email === '') {
    errors.email = 'Email is required'
  }
  if (user.password === '') {
    errors.password = 'Password is required'
  }

  //Vérifier l'email unique
  try {
    const existingEmail = await userRepository.findByEmail(email)
    if (existingEmail) {
      errors.email = { msg: 'Cette adresse email est déjà utilisée' }
    } else {
      user = await userRepository.create(user)
    }
  } catch (err) {
    errors.email = { msg: 'DB error' }
    throw { errors, statusCode: 400 }
  }
  if (errors && errors.email) {
    throw { errors, statusCode: 400 }
  }
  return user
}

const searchUsers = async () => {
  return await userRepository.findAll()
}

module.exports = { connection, createUser, searchUsers }
