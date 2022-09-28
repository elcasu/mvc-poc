const CartModel = require('../../public/js/models/cart.model')
const CartView = require('../../public/js/views/cart.view')

// TODO: handle DOM, probably using testing-library
describe.skip('Cart View', () => {
  describe('Empty cart', () => {
    it('renders without a badge and empty view', async () => {
      const cartModel = new CartModel()
      const cartView = new CartView()
      cartView.display(cartModel)

      // glyphicon glyphicon-shopping-cart
      expect(true).toBeTruthy()
    })
  })
})
