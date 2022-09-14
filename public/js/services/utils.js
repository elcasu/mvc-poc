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
