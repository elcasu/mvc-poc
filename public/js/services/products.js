define([
  'services/http'
], function(httpService) {
  // TODO: make this global
  const BASE_URL = 'https://fakestoreapi.com'

  function ProductService() {
  }

  function _get(endpoint) {
    return httpService.get(`${BASE_URL}/${endpoint}`)
  }

  ProductService.prototype.getProducts = function() {
    return _get(`products`)
  }

  ProductService.prototype.getProduct = function(id) {
    return _get(`products/${id}`)
  }

  return new ProductService()
})
