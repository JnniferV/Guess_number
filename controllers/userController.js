const { validationResult } = require('express-validator')
const userService = require('../services/userService')

const getUsers = async (req, res) => {
  res.render('users/list', { users: await userService.searchUsers() })
}

const postLogin = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render(
        'users/login',
        getViewData({ email: req.body.email, errors: errors.mapped() }),
      )
  }
  try {
    // Mise en session de l'utilisateur reconnu
    req.session.user = await userService.connection(
      req.body.email,
      req.body.password,
    )
    res.redirect('/')
  } catch (error) {
    return res
      .status(422)
      .render('users/login', getViewData({ errors: error.errors }))
  }
}

const getCreate = (req, res) => {
  res.render('users/create', getViewData())
}
const postCreate = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render(
        'users/create',
        getViewData({ email: req.body.email, errors: errors.mapped() }),
      )
  }
  try {
    await userService.createUser(req.body.email, req.body.password)
    res.redirect('/users/login')
  } catch (error) {
    return res.status(422).render('users/create', {
      email: req.body.email,
      errors: error.errors,
    })
  }
}

// Mutualiser les données de la vue
function getViewData({ email = '', errors = {} } = {}) {
  return {
    title: 'login',
    email,
    errors,
  }
}
// Affichage de la page de connexion
const getLogin = (req, res) => res.render('users/login', getViewData())

const getLogout = (req, res) => {
  //suppression de la session
  req.session.destroy()
  res.redirect('/')
}
module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getCreate,
  postCreate,
  getUsers,
}
