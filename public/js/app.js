define([
  'models/cart.model',
  'models/product.model',
  'views/cart.view',
  'views/product-list.view',
  'controllers/cart.controller',
  'controllers/product.controller',
], function(
  CartModel,
  ProductModel,
  CartView,
  ProductListView,
  CartController,
  ProductController
) {
  function App() {
    // cart
    this.cartModel = new CartModel()
    this.cartView = new CartView()
    this.cartController = new CartController(this.cartModel, this.cartView)

    // products
    this.productModel = new ProductModel()
    this.productListView = new ProductListView(this.cartController)
    this.productController = new ProductController(this.productModel, this.productListView)
  }

  App.prototype.init = async function() {
    const app = new App()

    // display the views
    app.productController.display()
    app.cartController.display()
  }

  return App
})
