jest.mock('vm')
const ProductModel = require('../../public/js/models/product.model')
const CartModel = require('../../public/js/models/cart.model')

const products = [
  {
    id: 1,
    title: 'Awesome T-Shirt',
    price: 109.95,
    description: 'Some product description',
    category: "men's clothing",
    image: 'https://example.com/product/1/image.png',
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 2,
    title: 'Fancy pants',
    price: 250.25,
    description: 'Some other product description',
    category: "men's clothing",
    image: 'https://example.com/product/2/image.png',
    rating: {
      rate: 5,
      count: 45
    }
  },
]

describe('Cart model', () => {
  describe('Add to cart', () => {
    it('adds an item to the cart', () => {
      const cart = new CartModel()

      // first thing, we ensure the cart is empty
      expect(cart.items).toHaveLength(0)

      // let's add a product to the cart
      cart.addItem(products[0])

      // now we expect to have one item in the cart
      expect(cart.items).toHaveLength(1)

      // and also expect that the item was added with the right data
      expect(cart.items[0]).toEqual({
        id: 1,
        name: 'Awesome T-Shirt',
        price: 109.95,
        quantity: 1
      })
    })

    it('modifies an item quantity if the product was already added', () => {
      const cart = new CartModel()

      // Let's add the first product (we just created a new CartModel instance
      // so we won't have items either.
      cart.addItem(products[0])

      // and now we add the same product again
      cart.addItem(products[0])

      // since it's the same product, we expect that the length is still 1
      expect(cart.items).toHaveLength(1)

      // and expect that the item has quantity of 2
      expect(cart.items[0]).toEqual({
        id: 1,
        name: 'Awesome T-Shirt',
        price: 109.95,
        quantity: 2
      })
    })

    it('adds a new item if the product was not added before', () => {
      const cart = new CartModel()
      cart.addItem(products[0])

      // now we add a different product
      cart.addItem(products[1])

      // this time we should have 2 items
      expect(cart.items).toHaveLength(2)

      expect(cart.items).toEqual([
        {
          id: 1,
          name: 'Awesome T-Shirt',
          price: 109.95,
          quantity: 1
        },
        {
          id: 2,
          name: 'Fancy pants',
          price: 250.25,
          quantity: 1
        }
      ])
    })
  })

  describe('Remove from cart', () => {
    it('removes items from the cart', () => {
      const cart = new CartModel()

      cart.addItem(products[0])
      cart.addItem(products[1])

      expect(cart.items).toHaveLength(2)

      // let's remove an item
      cart.removeItem(products[1])

      // and expect that the length decreases by 1
      expect(cart.items).toHaveLength(1)
      expect(cart.items[0]).toEqual({
        id: 1,
        name: 'Awesome T-Shirt',
        price: 109.95,
        quantity: 1
      })

      // removing the other item
      cart.removeItem(products[0])
      expect(cart.items).toHaveLength(0)
    })

    it('throws an error if we try to remove a product that does not exist in the cart', () => {
      const cart = new CartModel()

      // we add just the first product to the cart
      cart.addItem(products[0])

      // and try to remove the second product, which should fail
      try {
        cart.removeItem(products[1])

        // note that here we throw a different error. This is because we could have
        // the usecase in which the method doesn't throw anything (e.g. it could just
        // return `undefined`) and in this case the test would pass! This is because
        // since nothing is thrown, we'd never get to the expectation we have
        // in the "catch" block
        throw new Error('This should fail')
      } catch (error) {
        // note that we catch the error to avoid exiting the test with
        // an uncaught exception
        expect(error.message).toEqual('Error: product does not exist in the cart')
      }
    })
  })

  describe('Get a cart item', () => {
    it('gets an item', () => {
      const cart = new CartModel()

      // let's add some products to the cart
      cart.addItem(products[0])
      cart.addItem(products[1])

      // and try to get the item for the second product
      const item = cart.getItem(products[0])
      expect(item).toEqual({
        id: 1,
        name: 'Awesome T-Shirt',
        price: 109.95,
        quantity: 1
      })
    })

    it('throws an error if we try to get an unexisting item', () => {
      const cart = new CartModel()

      // this time we add just one product
      cart.addItem(products[0])

      // and try to get the item for the other product
      try {
        cart.getItem(products[1])
        throw new Error('This should fail')
      } catch (error) {
        expect(error.message).toEqual('Error: product not found in the cart')
      }
    })
  })
})
