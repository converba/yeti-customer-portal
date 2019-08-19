define(function (require) {
  var Vue = require('vue');
  var Vuex = require('vuex');
  var Router = require('vue-router');
  var store = require('../store/index');
  var plugins = require('../plugins/index');
  var AppRoot = require('../core/root');
  var Home = require('../core/pages/home');
  var i18n = require('../core/i18n/index');
  var VueMoment = require('vue-moment');

  Vue.use(Vuex);
  Vue.use(Router);
  Vue.use(VueMoment.install);

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

  return new Vue({
    router: router,
    store: store,
    vuetify: require('../core/vuetify'),
    render: h => h(AppRoot),
    i18n: i18n
  }).$mount(`#app`);
});
