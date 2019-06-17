define(function (require) {
  var Vue = require('vue')
  var Router = require('vue-router')
  var Vuetify = require('vuetify')

  var plugins = require('../plugins/index')

  var AppRoot = require('../app/root')
  var Home = require('../app/pages/home')

  Vue.use(Router)
  Vue.use(Vuetify, {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  })

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
  })


  if(plugins && plugins.modules) {
    let modules = plugins.modules;
    let modulesArr = modules.map(function(name) {
      return '../plugins/' + name + '/index';
    });

    // Apply plugins
    require(modulesArr, function (module) {
      for(let i = 0, len = arguments.length; i < len; i++) {
        Vue.use(arguments[i], {
          router
        })
      }
    });

    // Add CSS of modules
    let styleNode = document.createElement('style')
    let stylesStr = ''
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
    render: h => h(AppRoot),
  }).$mount(`#app`);

  return {}
});
