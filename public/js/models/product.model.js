// we have to add the line below, so "define" is defined to jest
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([
  'services/products'
], function(productService) {
  function ProductModel() {
  }

  ProductModel.prototype.getProducts = async function() {
    try {
      return await productService.getProducts()
    } catch (error) {
      throw new Error('Something went wrong, try again later')
    }
  }

  return ProductModel
})
