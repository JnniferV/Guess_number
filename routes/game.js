const express = require('express')

const gameController = require('../controllers/gameController')
const { checkUserInSession } = require('../middlewares/authMiddleware')

var router = express.Router()

router.get('/', checkUserInSession, gameController.getPlay)
router.post('/', checkUserInSession, gameController.processForm)
router.post('/replay', checkUserInSession, gameController.getReplay)

module.exports = router
