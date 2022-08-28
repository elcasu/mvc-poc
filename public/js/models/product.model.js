(function(w) {
  function ProductModel() {
  }

  ProductModel.prototype.getProducts = function() {
    return w.app.services.productService.getProducts()
  }

  w.app.models.ProductModel = ProductModel
})(window)
