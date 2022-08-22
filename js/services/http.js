(function(w) {
  function HttpService() {
  }

  HttpService.prototype.get = async function(url) {
    const result = await w.fetch(url)
    return result.json()
  }

  w.services.HttpService = HttpService
})(window)
