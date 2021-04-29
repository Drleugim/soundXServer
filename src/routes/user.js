const router = require('express').Router()
const { signup, signin, userData, editUser } = require('../controllers/user.controller')
const { auth } = require('./../utils/auth')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/userData').get(auth,userData)
router.route('/editUser/:userId').post(auth,editUser)

module.exports = router