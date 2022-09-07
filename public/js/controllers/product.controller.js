define([
], function() {
  function ProductController(productModel, productListView) {
    this.productModel = productModel
    this.productListView = productListView
  }

  ProductController.prototype.display = function() {
    this.productListView.display(this.productModel)
  }

  return ProductController
})
