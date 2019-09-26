define(function (require) {
  var Vue = require('vue');
  var cdrsService = require('../../services/Cdrs.js');

  return {
    state: {
      cdrs: []
    },
    actions: {
      loadCdrs ({ commit }, data) {
        cdrsService.getCdrs(data)
          .then(function (cdrsList) {
            if (cdrsList) {
              commit('SET_CDRS', cdrsList)
            }
          })
          .catch((e) => {
            commit('SET_AUTH_TOKEN', '');
            commit('SET_AUTHORIZED_STATUS', false);
            commit('SET_SHOW_AUTH_DIALOG', true);
            window.localStorage.removeItem('authToken');
          })
      },
      setCdrs ({ commit }, cdrsList) {
        commit('SET_CDRS', cdrsList)
      }
    },
    mutations: {
      SET_CDRS (state, cdrsList) {
        Vue.set(state, 'cdrs', cdrsList)
      }
    },
    getters: {
      cdrs (state) {
        return state.cdrs
      }
    }
  }
});
