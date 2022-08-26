(function(w) {
  function CartController(cartModel, cartView) {
    this.cartModel = cartModel
    this.cartView = cartView

    // bind event listeners
    cartView.cartButton.addEventListener('click', () => {
      cartView.toggleCart(cartModel)
    })
  }

  CartController.prototype.display = function() {
    this.cartView.display(this.cartModel)
  }

  CartController.prototype.addToCart = function(product) {
    this.cartModel.addItem(product)
  }

  w.app.controllers.CartController = CartController
})(window)
