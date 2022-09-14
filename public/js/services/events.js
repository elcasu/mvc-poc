// we have to add the line below, so "define" is defined to jest
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {
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

  EventHandler.prototype.notify = function(event, model) {
    const eventObservers = this.observers.filter(o => o.key === event)
    eventObservers.forEach(o => o.observer.update(model))
  }

  return new EventHandler()
})
