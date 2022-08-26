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

    // event listener which detects clicks outside the component
    document.addEventListener('click', (event) => {
      if (!event.target.closest('#cart') && !event.target.closest('#cart-trigger')) {
        this.cleanup()
      }
    })
  }

  CartView.prototype.toggleCart = function(cart) {
    if (!this.visible) {
      this.displayCart(cart)
    } else {
      this.cleanup()
    }
  }

  CartView.prototype.displayCart = function(cart) {
    // first, cleanup the cart view
    this.cleanup()

    // create the cart container
    const items = document.createElement('ul')
    items.setAttribute('class', 'list-group')

    // render items
    if (cart && cart.items.length) {
      cart.items.forEach(item => {
        // get the template for *each* item
        const row = this.cartItemTemplate(item)
        const deleteBtn = row.querySelector(`#remove-cart-item-${item.id}`)

        // now that we have the DOM representation of the item,
        // we're able to add a "click" event listener to the
        // trash button
        deleteBtn.addEventListener('click', () => cart.removeItem(item))

        // and finally append to the parent DOM
        items.appendChild(row)
      })
    } else {
      // if no items, then just display an empty view
      items.innerHTML = `<li class="list-group-item cart-empty">${EMPTY_CONTENT}</li>`
    }
    this.cartContainer.appendChild(items)
    this.visible = true
  }

  CartView.prototype.cleanup = function() {
    w.app.services.utils.cleanupView(this.cartContainer)
    this.visible = false
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

  CartView.prototype.display = function(cart) {
    this.update(cart)
  }

  // Templates
  // TODO: find a better way to handle this outside this class :thinking:
  CartView.prototype.cartItemTemplate = function(item) {
    const domParser = new w.DOMParser()
    const template = `
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
    return domParser.parseFromString(template, 'text/html').querySelector('li')
  }

  w.app.views.CartView = CartView
})(window)
