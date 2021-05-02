const Cart = require('../models/cart.model')
const User = require('../models/user.model')

module.exports = {

    async addToCart(req, res){
        try{
            const { body, user } = req
            const cartOwner = await User.findById(user)
     
           if(String(cartOwner.cart)!=='{}'){
                const cart = await Cart.findById(cartOwner.cart)
                const productAlreadyAdded = cart.products.some(product => String(product.product) === body.product_id)
       
                if(productAlreadyAdded){
                    cart.products.forEach(product => {
                        if(String(product.product) === body.product_id){
                            product.quantity = Number(product.quantity)+1
                        }  
                    })
                    await cart.save({ validateBeforeSave: false })
                }else{
                    cart.products.push({ product:body.product_id, quantity: 1})
                    await cart.save({ validateBeforeSave: false })
                }   
            }else{
               const cart = await Cart.create({ 
                    user, 
                    products: [{ product:body.product_id, quantity: '1'}]
                })
                await User.updateOne({_id: cartOwner}, {cart: cart._id} )
            }
            res.status(201).json({ message: 'Product sucessfully added to cart'})
        }catch(error){
            res.status(401).json({ message: 'error: Product was not added to the cart', error })
        }

    },
    async removeFromCart(req, res){
        try{
            const { body, user } = req
            const cartOwner = await User.findById(user)
            const cart = await Cart.findById(cartOwner.cart)
            await Cart.updateOne(
                {_id: cartOwner.cart}, 
                {products: cart.products.filter(product => String(product.product)!== body.product_id)}
            )
            res.status(201).json({ message: 'Product was removed from cart' })
        }catch(error){
            res.status(401).json({ message: 'error: Product was not removed from cart', error })
        }
    },
    async decreaseQtyFromCart (req, res){
        try{
            const { body, user } = req
            const cartOwner = await User.findById(user)
            const cart = await Cart.findById(cartOwner.cart)
          
            cart.products.forEach(product => {
                if(String(product.product) === body.product_id){
                    if(Number(product.quantity) > 1 ){
                        product.quantity = Number(product.quantity)-1
                    }
                }  
            })
            await cart.save({ validateBeforeSave: false })
            res.status(201).json({ message: 'Product quantity was decreased' })
        }catch(error){
            res.status(401).json({ message: 'error: Product quantity was not decreased', error })
        }
    },
    async getCart(req, res){
        try{
            const { user } = req
            const cartOwner = await User.findById(user)
            let cart
    
            if(String(cartOwner.cart)!=='{}'){
                const user_cart = await Cart.findById(cartOwner.cart)
                cart = user_cart.products
            }else{
                cart = []
            }

            res.status(201).json({ cart })
        }catch(error){
            res.status(401).json({ message: 'error: Product was not added to the cart', error })
        }
    },
    async emptyCart(req, res) {
        try{
            const { user } = req
            const cartOwner = await User.findById(user)
            await Cart.updateOne({ _id: cartOwner.cart}, { products: []})

            res.status(201).json({message: 'Cart is now empty'})

        }catch(error){
            res.status(401).json({ message: 'Cart could not be emptied', error })
        }
    }
}