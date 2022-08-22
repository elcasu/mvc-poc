(function EventHandler(w) {
  function EventHandler() {
    // Here we'll store the observers, this is all
    // the views which will be listening to events
    this.observers = []
  }

  EventHandler.prototype.subscribe = function(event, observer) {
    this.observers.push({
      key: event,
      observer: observer
    })
  }

  EventHandler.prototype.notify = function(event, data) {
    const eventObservers = this.observers.filter(o => o.key === event)
    eventObservers.forEach(o => o.observer.update(data))
  }

  w.app.services.EventHandler = EventHandler
})(window)
