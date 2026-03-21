const gameService = require('../services/gameService')

// Affichage du formulaire du jeu
function getPlay(req, res) {
  if (req.session && req.session.user && !req.session.goodNumber) {
    initPlay(req)
  }
  res.render('game')
}

//Initialisation du jeu
function initPlay(req) {
  //appel du service
  const goodNb = gameService.generateGoodNumber()
  console.log('Nb mystère ' + goodNb)
  req.session.goodNumber = goodNb
  req.session.attempts = 0
  req.session.startTime = Date.now()
  // Vider les messages alertes
  req.session.errorMessage = ''
  req.session.successMessage = ''
}

// Traitement du formulaire
async function processForm(req, res) {
  const choice = parseInt(req.body.choice)
  const goodNb = req.session.goodNumber
  req.session.attempts = (req.session.attempts || 0) + 1
  //Appel gameService
  const alertes = gameService.checkNumber(goodNb, choice)
  req.session.errorMessage = alertes.errorMessage
  req.session.successMessage = alertes.successMessage

  if (alertes.successMessage) {
    await gameService.saveGame({
      user: req.session.user._id,
      attempts: req.session.attempts,
      numberToFind: goodNb,
      time: Date.now() - req.session.startTime,
      inProgress: false,
    })
    delete req.session.goodNumber
    delete req.session.startTime
    delete req.session.attempts
  }

  res.redirect('/game')
}

// Gestion du bouton "Rejouer"
function getReplay(req, res) {
  initPlay(req)
  res.redirect('/game')
}

module.exports = { getPlay, processForm, getReplay }
