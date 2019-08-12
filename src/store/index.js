define(function (require) {
  var Vue = require('vue');
  var Vuex = require('vuex');
  var auth = require('../store/modules/auth');
  var accounts = require('../store/modules/accounts');
  var cdrs = require('../store/modules/cdrs');

  Vue.use(Vuex);

  return new Vuex.Store({
    state: {
      showDrawer: false
    },
    actions: {
      setShowDrawer ({commit}, showDrawer) {
        commit('SET_SHOW_DRAWER', showDrawer)
      },
    },
    mutations: {
      SET_SHOW_DRAWER (state, showDrawer) {
        Vue.set(state, 'showDrawer', showDrawer)
      },
    },
    getters: {
      showDrawer (state) {
        return state.showDrawer
      },
    },
    modules: {
      auth: auth,
      accounts: accounts,
      cdrs: cdrs
    }
  })
});




