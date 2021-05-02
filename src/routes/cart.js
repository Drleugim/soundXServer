const router = require('express').Router()
const { getCart, addToCart, decreaseQtyFromCart, removeFromCart, emptyCart } = require('../controllers/cart.controller')
const { auth } = require('../utils/auth')


router.route('/getCart').get(auth,getCart)
router.route('/add').post(auth, addToCart)
router.route('/decreaseQty').post(auth, decreaseQtyFromCart)
router.route('/remove').post(auth, removeFromCart)
router.route('/emptyCart').post(auth, emptyCart)

module.exports = router