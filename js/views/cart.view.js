(function(w) {
  const EMPTY_CONTENT = 'No items in your cart yet!'

  function CartView(eventHandler) {
    // define properties
    this.visible = false
    this.eventHandler = eventHandler

    // define en bind the views
    this.cartContainer = document.getElementById('cart')
    this.cartButton = document.getElementById('cart-trigger')
    this.cartBadge = document.getElementById('cart-badge')

    // subscribe to events
    this.eventHandler.subscribe('cart_changed', this)
  }

  CartView.prototype.toggleCart = function(cart) {
    if (!this.visible) {
      this.displayCart(cart)
    } else {
      this.cleanup()
    }
    this.visible = !this.visible
  }

  CartView.prototype.displayCart = function(cart) {
    // first, cleanup the cart view
    this.cleanup()

    // create the cart container
    const items = document.createElement('ul')
    items.setAttribute('class', 'list-group')

    // render items
    if (cart && cart.items.length) {
      const domParser = new w.DOMParser()
      cart.items.forEach(item => {
        // get the template for *each* item
        const row = this.cartItemTemplate(item)
        const domItem = domParser.parseFromString(row, 'text/html').querySelector('li')

        // now that we have the DOM representation of the item,
        // we're able to add a "click" event listener
        domItem.addEventListener('click', () => cart.removeItem(item))

        // and finally append to the parent DOM
        items.appendChild(domItem)
      })
    } else {
      // if no items, then just display an empty view
      items.innerHTML = `<li class="list-group-item cart-empty">${EMPTY_CONTENT}</li>`
    }
    this.cartContainer.appendChild(items)
  }

  CartView.prototype.cleanup = function() {
    while (this.cartContainer.firstChild) {
      this.cartContainer.removeChild(this.cartContainer.firstChild)
    }
  }

  // this method will be called when an event is triggered
  CartView.prototype.update = function(cart) {
    if (cart && cart.items && cart.items.length) {
      this.cartBadge.textContent = cart.items.length
    } else {
      this.cartBadge.textContent = ''
    }
    if (this.visible) {
      this.displayCart(cart)
    } else {
      this.cleanup()
    }
  }

  // Templates
  // TODO: find a better way to handle this outside this class :thinking:
  CartView.prototype.cartItemTemplate = function(item) {
    return `
      <li class="cart-item list-group-item">
        <div class="row p-3">
          <div class="col">${item.name}</div>
          <div class="col">${item.quantity}</div>
          <div class="col-1 d-flex">
            <span
              id="remove-cart-item-${item.id}"
              class="remove-item glyphicon glyphicon-trash align-items-center"
            ></span>
          </div>
        </div>
      </li>`
  }

  w.app.views.CartView = CartView
})(window)
