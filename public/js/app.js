define([
  'services/events',
  'models/cart.model',
  'models/product.model',
  'views/cart.view',
  'views/product-list.view',
  'controllers/cart.controller',
  'controllers/product.controller',
], function(
  EventHandler,
  CartModel,
  ProductModel,
  CartView,
  ProductListView,
  CartController,
  ProductController
) {
  function App() {
    // services
    this.eventHandler = new EventHandler()

    // cart
    this.cartModel = new CartModel(this.eventHandler)
    this.cartView = new CartView(this.eventHandler)
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
