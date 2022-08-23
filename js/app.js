(function(w) {
  function App() {
    // services
    this.eventHandler = new w.app.services.EventHandler()

    // cart
    this.cartModel = new w.app.models.CartModel(this.eventHandler)
    this.cartView = new w.app.views.CartView(this.eventHandler)
    this.cartController = new w.app.controllers.CartController(this.cartModel, this.cartView)

    // products
    this.productModel = new w.app.models.ProductModel()
    this.productListView = new w.app.views.ProductListView(this.cartController)
    this.productController = new w.app.controllers.ProductController(this.productModel, this.productListView)
    this.services = w.app.services
  }

  async function initApp() {
    const app = new App()

    // display the views
    app.productController.display()
    app.cartController.display()
  }

  // initialize globals
  w.app = w.app || {}
  w.app.views = w.app.views || {}
  w.app.models = w.app.models || {}
  w.app.controllers = w.app.controllers || {}
  w.app.services = w.app.services || {}
  window.addEventListener('load', initApp)
})(window)
