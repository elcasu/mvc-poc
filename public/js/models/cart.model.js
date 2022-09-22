// we have to add the line below, so "define" is defined to jest
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([
  'services/events'
], function(eventHandler) {
  function CartModel() {
    this.items = []
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
    eventHandler.notify('cart_changed', this)
  }

  CartModel.prototype.removeItem = function(item) {
    if (!this.items.find(i => i.id === item.id)) {
      throw new Error('Error: product does not exist in the cart')
    }
    this.items = this.items.filter(i => i.id !== item.id)
    eventHandler.notify('cart_changed', this)
  }

  CartModel.prototype.getItem = function(product) {
    return this.items.find(item => item.id === product.id)
  }

  return CartModel
})
