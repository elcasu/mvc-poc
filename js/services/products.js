(function(w) {
  // TODO: make this global
  const BASE_URL = 'https://fakestoreapi.com'

  function ProductService() {
    this.http = new w.services.HttpService()
  }

  function _get(endpoint) {
    return this.http.get(`${BASE_URL}/${endpoint}`)
  }

  ProductService.prototype.getProducts = function() {
    return _get(`products`)
  }

  ProductService.prototype.getProduct = function(id) {
    return _get(`products/${id}`)
  }

  w.services.ProductService = ProductService
})(window)
