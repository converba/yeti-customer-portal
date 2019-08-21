/**
 * Rates plugin v0.0.1
 * (c) 2019 Vladimir Barkasov
 * @license MIT
 */
'use strict';

define(function (require) {
  var Main = require('../rates/main');


  function install (Vue, options) {
    let { routes } = options.router.options;

    routes.push({
      path: '/rates', component: Main
    });
    options.router.addRoutes(routes)
  }

  return {
    install: install,
    version: '0.0.1'
  }
});
