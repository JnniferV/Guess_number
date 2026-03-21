const session = require('express-session')

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Ne pas sauvegarder la session à chaque requête
  saveUninitialized: true, // Sauvegarde les sessions nouvelles mais non modifiées
  cookie: { secure: false },
})
