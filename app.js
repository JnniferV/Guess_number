require('dotenv').config()

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// Middleware
const { checkUserInSession } = require('./middlewares/authMiddleware')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const gameRouter = require('./routes/game')
const rankRouter = require('./routes/rank')

//Middlewares
const session = require('./middlewares/session')

// DATABASE
const { connectDB } = require('./config/database')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Charger Bootstrap depuis 'node_modules'
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist')),
)

// Bootstrap Icons depuis 'node_modules'
app.use(
  '/bootstrap-icons',
  express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')),
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Activer la session
app.use(session)
//user accessible dans toutes les vues
app.use((req, res, next) => {
  //Pour éviter de réinjecter dans chaque vue l'attribut user. Il vaut soit null soit l'utilisateur connecté
  res.locals.user = req.session.user || null
  // Rendre les messages flash disponibles dans les templates
  res.locals.successMessage = req.session.successMessage
  res.locals.errorMessage = req.session.errorMessage
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/game', checkUserInSession, gameRouter)
app.use('/rank', checkUserInSession, rankRouter)

app.use(express.static(path.join(__dirname, 'public')))
// Connexion à la base de données puis démarrage du serveur
connectDB()
  .then(() => {
    console.log(`🚀 Serveur et base actifs`)
  })
  .catch((err) => {
    console.error('❌ Échec de la connexion à MongoDB :', err.message)
    process.exit(1) // Quitte proprement l'application
  })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
