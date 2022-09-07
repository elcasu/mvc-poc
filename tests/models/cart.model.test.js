const {
  jest,
  describe,
  it,
  define
} = global

// TODO: mock "define"

const CartModel = require('../../public/js/models/cart.model')

console.log('cartModel -->', CartModel)

describe('Cart model', () => {
  it('adds an item to the cart', () => {
    const cart = new CartModel()
    console.log('cart ->', cart)
  })
})
