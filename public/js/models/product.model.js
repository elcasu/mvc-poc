define([
  'services/products'
], function(productService) {
  function ProductModel() {
  }

  ProductModel.prototype.getProducts = function() {
    return productService.getProducts()
  }

  return ProductModel
})
