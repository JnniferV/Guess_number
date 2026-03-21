var express = require('express')
var router = express.Router()
const { body, validationResult } = require('express-validator')
const userController = require('../controllers/userController')

router.get('/login', userController.getLogin)
router.post(
  '/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address'),
    body('password')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage(
        'Password must be at least 3 and at most 20 characters long',
      ),
  ],
  userController.postLogin,
)
router.get('/create', userController.getCreate)
router.post(
  '/create',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address'),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    }),
  ],
  userController.postCreate,
)

router.get('/logout', userController.getLogout)

const {
  checkUserInSessionAndCheckRoleAdmin,
} = require('../middlewares/authMiddleware')

/* GET users listing. */
router.get('/', checkUserInSessionAndCheckRoleAdmin, userController.getUsers)

module.exports = router
