const router = require('express').Router()
const { publish, buyRent } = require('../controllers/product.controller')
const { formData } = require('../utils/formData')
const { auth } = require('../utils/auth')

router.route('/buyRent').get(buyRent)
router.route('/publish').post(auth,formData,publish)


module.exports = router