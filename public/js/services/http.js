// we have to add the line below, so "define" is defined to jest
if (typeof define !== 'function') { var define = require('amdefine')(module) }

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
