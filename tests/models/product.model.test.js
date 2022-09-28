const ProductModel = require('../../public/js/models/product.model')
const productsMock = [
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(productsMock),
  })
)

describe('ProductModel', () => {
  describe('success usecases', () => {
    it('gets a list of products', async () => {
      const productModel = new ProductModel()
      const products = await productModel.getProducts()
      expect(products).toEqual(productsMock)
    })
  })

  describe('fail usecases', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.reject('Internal server error')
      )
    })

    it('throws an error if the request failed', async () => {
      const productModel = new ProductModel()
      try {
        await productModel.getProducts()
        throw new Error('this should fail')
      } catch(error) {
        expect(error.message).toEqual('Something went wrong, try again later')
      }
    })
  })
})
