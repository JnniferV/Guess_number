const mongoose = require('mongoose')
const User = require('./models/User')
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')

const uri = 'mongodb://localhost:27017/express_brain'

// admin - password : admin
// user - password : user

const flushDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(uri)

    console.log('📡 Connecté à MongoDB')

    // Suppression des anciens utilisateurs (optionnel)
    await User.deleteMany({})
    console.log('🗑️ Utilisateurs supprimés')

    // Insertion des nouveaux utilisateurs
    await User.insertMany(users)
    console.log('✅ Nouveaux utilisateurs insérés')
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    // Fermeture de la connexion
    await mongoose.disconnect()
    console.log('🔌 Déconnecté de MongoDB')
  }
}

// Exécuter la fonction
;(async () => {
  await flushDatabase()
})()
