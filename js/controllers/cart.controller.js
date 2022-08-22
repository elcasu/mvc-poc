(function(w) {
  function CartController(cartModel, cartView) {
    this.cartModel = cartModel
    this.cartView = cartView

    // bind event listeners
    cartView.cartButton.addEventListener('click', () => {
      cartView.toggleCart(cartModel)
    })
  }

  w.app.controllers.CartController = CartController
})(window)
