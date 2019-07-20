define(function (require) {
  var Vue = require('vue');
  var Vuex = require('vuex');
  var auth = require('../store/modules/auth');

  Vue.use(Vuex);

  return new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {
      auth: auth
    }
  })
});




