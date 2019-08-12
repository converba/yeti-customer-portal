define(function (require) {
  var Main = require('../cdrs/main');

  function install (Vue, options) {
    let { routes } = options.router.options;

    routes.push({
      path: '/cdrs', component: Main
    });
    options.router.addRoutes(routes)
  }

  return {
    install: install,
    version: '0.0.1'
  }
});
