(function(w) {
  // TODO: make this global
  const BASE_URL = 'https://fakestoreapi.com'

  function ProductService() {
  }

  function _get(endpoint) {
    return w.app.services.http.get(`${BASE_URL}/${endpoint}`)
  }

  ProductService.prototype.getProducts = function() {
    return _get(`products`)
  }

  ProductService.prototype.getProduct = function(id) {
    return _get(`products/${id}`)
  }

  w.app.services.productService = new ProductService()
})(window)
