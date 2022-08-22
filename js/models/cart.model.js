(function(w) {
  function CartModel(eventHandler) {
    this.items = []
    this.eventHandler = eventHandler
  }

  CartModel.prototype.addItem = function(item) {
    this.items.push(item)
  }

  CartModel.prototype.removeItem = function(item) {
    this.items = this.items.filter(i => i.id !== item.id)
    this.eventHandler.notify('cart_changed', this)
  }

  w.app.models.CartModel = CartModel
})(window)
