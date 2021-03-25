const router = require('express').Router()
const { publish, buyRent } = require('../controllers/product.controller')
const { formData } = require('../utils/formData')

router.route('/buyRent').get(buyRent)
router.route('/:userId').post(formData,publish)


module.exports = router