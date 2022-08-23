(function(w) {
  function Utils() {
  }

  Utils.prototype.cleanupView = function(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  w.app.services.utils = new Utils()
})(window)
