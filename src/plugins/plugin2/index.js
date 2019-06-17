'use strict';

define(function (require) {
  var Main = require('../plugin2/main')
  console.log('Main:')
  console.log('main')

  function install (Vue, options) {
    // eslint-disable-next-line
    console.log('Simple plugin 2 loaded')

    // Vue.component('component', Component)
    let { routes } = options.router.options;

    routes.push({
      path: '/plugin2', component: Main
    })
    options.router.addRoutes(routes)
  }

  return {
    install: install,
    version: '0.0.1'
  }
})
