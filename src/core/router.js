define(function (require) {
  var Vue = require('vue');
  var Router = require('vue-router');
  var plugins = require('../plugins/index');

  var Home = require('../core/pages/home');

  Vue.use(Router);

  var router = new Router({
    /* mode: 'history',
    base: '/', */
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  });

  if(plugins && plugins.modules) {
    let modules = plugins.modules;
    let modulesArr = modules.map(function(name) {
      return '../plugins/' + name + '/index';
    });

    require(modulesArr, function (module) {
      for(let i = 0, len = arguments.length; i < len; i++) {
        Vue.use(arguments[i], {
          router
        })
      }
    });
  }

  return router;
});
