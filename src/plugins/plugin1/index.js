/**
 * Simple plugin v0.0.1
 * (c) 2019 Vladimir Barkasov
 * @license MIT
 */
'use strict';

define(function (require) {
  var Main = require('../plugin1/main')
  require('../plugin1/lib/vanillatoasts')


  function install (Vue, options) {
    // eslint-disable-next-line
    console.log('Simple plugin 1 loaded')

    // Vue.component('component', Component)
    let { routes } = options.router.options;

    routes.push({
      path: '/plugin1', component: Main
    })
    options.router.addRoutes(routes)
  }

  return {
    install: install,
    version: '0.0.1'
  }
})
