define([
  'services/utils'
], function(utils) {
  function ProductListView (cartController) {
    this.cartController = cartController
    this.productListContainer = document.getElementById('product-list')
    this.products = []
  }

  ProductListView.prototype.display = async function(productModel) {
    // cleanup the list view
    this.cleanup()

    if (!this.products || !this.products.length) {
      // display "loading" spinner
      const loadingNode = this.loadingTemplate()
      this.productListContainer.appendChild(loadingNode)

      this.products = await productModel.getProducts()

      // products loaded, hide the spinner
      this.productListContainer.removeChild(loadingNode)
    }

    this.products.forEach(product => {
      // take each product and append it's template to the container
      const itemTemplate = this.productListTemplate(product)
      const addToCartTrigger = itemTemplate.querySelector('.add-to-cart')
      addToCartTrigger.addEventListener('click', () => this.cartController.addToCart(product))
      this.productListContainer.appendChild(itemTemplate)
    })
  }

  ProductListView.prototype.cleanup = function() {
    utils.cleanupView(this.productListContainer)
  }

  // TODO: maybe we could split the spinner as a separate view?
  ProductListView.prototype.loadingTemplate = function() {
    const domParser = new DOMParser()
    const template = `
      <div class="spinner d-flex flex-column align-items-center mt-5 w-100">
        <div class="spinner-border">
        </div>
      </div>`
    return domParser.parseFromString(template, 'text/html').querySelector('.spinner')
  }

  ProductListView.prototype.productListTemplate = function(product) {
    const domParser = new DOMParser()
    const template = `
      <div class="product-item d-flex justify-content-between">
        <div>
          <div class="title">${product.title}</div>
          <div class="product-item-img">
            <img src="${product.image}" alt="${product.name}" width="150" />
          </div>
        </div>
        <div class="position-relative">
          <div>
            <div class="price">$${product.price}</div>
          </div>
          <div class="description">${product.description}</div>
          <div class="actions mt-5 d-flex justify-content-between">
            <button class="add-to-cart btn btn-success btn-lg">Add to cart</button>
            <button class="add-to-cart btn btn-outline-primary btn-lg">View details</button>
          </div>
        </div>
      </div>
    `
    return domParser.parseFromString(template, 'text/html').querySelector('.product-item')
  }

  return ProductListView
})
