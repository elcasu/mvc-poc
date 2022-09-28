// we have to add the line below, so "define" is defined to jest
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([
], function() {
  function Utils() {
  }

  Utils.prototype.cleanupView = function(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  return new Utils()
})
