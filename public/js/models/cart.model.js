define([
], function() {
  function CartModel(eventHandler) {
    this.items = []
    this.eventHandler = eventHandler
  }

  CartModel.prototype.addItem = function(item) {
    const existingItem = this.items.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: 1,
      })
    }
    this.eventHandler.notify('cart_changed', this)
  }

  CartModel.prototype.removeItem = function(item) {
    this.items = this.items.filter(i => i.id !== item.id)
    this.eventHandler.notify('cart_changed', this)
  }

  CartModel.prototype.getItem = function(product) {
    return this.items.find(item => item.id === product.id)
  }

  return CartModel
})
