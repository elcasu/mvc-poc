(function(w) {
  function App() {
    this.eventHandler = new w.app.services.EventHandler()
    // cart
    this.cartModel = new w.app.models.CartModel(this.eventHandler)
    this.cartView = new w.app.views.CartView(this.eventHandler)
    this.cartController = new w.app.controllers.CartController(this.cartModel, this.cartView)

    // products
    this.productModel = new w.app.models.ProductModel()
    this.productListView = new w.app.views.ProductListView()
    this.productController = new w.app.controllers.ProductController()
    this.services = w.app.services
  }

  async function initApp() {
    const app = new App()
    app.cartModel.items = [
      { id: 1, name: 'My first item', quantity: 1 },
      { id: 2, name: 'My second item', quantity: 4 },
      { id: 3, name: 'My third item', quantity: 10 },
    ]
    app.productsView.update(app.productsView)
    app.cartView.update(app.cartModel)
  }

  // initialize globals
  w.app = w.app || {}
  w.app.views = w.app.views || {}
  w.app.models = w.app.models || {}
  w.app.controllers = w.app.controllers || {}
  w.app.services = w.app.services || {}
  window.addEventListener('load', initApp)
})(window)
