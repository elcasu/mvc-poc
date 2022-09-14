define([
], function() {
  function HttpService() {
  }

  HttpService.prototype.get = async function(url) {
    const result = await fetch(url)
    return result.json()
  }

  return new HttpService()
})
