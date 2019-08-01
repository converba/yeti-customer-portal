/**
 * Accounts plugin v0.0.1
 * (c) 2019 Vladimir Barkasov
 * @license MIT
 */
'use strict';

define(function (require) {
  var Main = require('../accounts/main');


  function install (Vue, options) {
    let { routes } = options.router.options;

    routes.push({
      path: '/accounts', component: Main
    });
    options.router.addRoutes(routes)
  }

  return {
    install: install,
    version: '0.0.1'
  }
});
