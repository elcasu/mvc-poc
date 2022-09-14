require.config({
  baseUrl: './js',
  paths: {
    models: './models',
    views: './views',
    controllers: './controllers',
    services: './services',
  },
})

require([
  'app'
], function(App) {
  const app = new App()
  app.init()
})
