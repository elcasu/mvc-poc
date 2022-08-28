(function(w) {
  function ProductController(productModel, productListView) {
    this.productModel = productModel
    this.productListView = productListView
  }

  ProductController.prototype.display = function() {
    this.productListView.display(this.productModel)
  }

  w.app.controllers.ProductController = ProductController
})(window)
