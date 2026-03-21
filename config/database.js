// config/database.js
/**
 *   Utilisation de Mongoose
 */
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

/**
 *  Gestion de la connexion à la base à Mongoose
 */
const connectDB = async () => {
  await mongoose.connect(uri)
  console.log('✅ Connexion réussie à MongoDB')
}

module.exports = { connectDB }
