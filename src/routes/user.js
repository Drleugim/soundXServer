const router = require('express').Router()
const { signup, signin, userData } = require('../controllers/user.controller')
const { auth } = require('./../utils/auth')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/userData').get(auth,userData)

module.exports = router