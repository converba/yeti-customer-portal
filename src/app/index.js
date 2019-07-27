define(function (require) {
  var Vue = require('vue');
  var Vuex = require('vuex');
  var Router = require('vue-router');
  var Vuetify = require('vuetify');
  var store = require('../store/index');
  var plugins = require('../plugins/index');
  var AppRoot = require('../app/root');
  var Home = require('../app/pages/home');
  var i18n = require('../app/i18n/index');


  Vue.use(Vuex);
  Vue.use(Router);
  Vue.use(Vuetify, {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  });

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
    // load plugins
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

    // Add CSS of modules
    let styleNode = document.createElement('style');
    let stylesStr = '';
    for(let i=0, len = modules.length; i<len; i++) {
      stylesStr += '@import url("' +
        './plugins/' + modules[i] + '/' + modules[i] + '.css'
        + '");'
    }
    styleNode.innerHTML = stylesStr;
    document.body.appendChild(styleNode);
  }

  new Vue({
    router: router,
    store: store,
    render: h => h(AppRoot),
    i18n: i18n
  }).$mount(`#app`);

  return {}
});
