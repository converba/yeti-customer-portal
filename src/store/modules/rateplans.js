define(function (require) {
  var Vue = require('vue');
  var rateplansService = require('../../services/Rateplans.js');

  return {
    state: {
      rateplans: []
    },
    actions: {
      loadRateplans ({ commit }, data) {
        rateplansService.getRateplans(data)
          .then(function (rateplans) {
            if(rateplans) {
              commit('SET_RATEPLANS', rateplans)
            }
          }).catch((e) => {
            commit('SET_AUTH_TOKEN', '');
            commit('SET_AUTHORIZED_STATUS', false);
            commit('SET_SHOW_AUTH_DIALOG', true);
            window.localStorage.removeItem('authToken');
          })
      },
      setRateplans ({ commit }, rateplans) {
        commit('SET_RATEPLANS', rateplans)
      }
    },
    mutations: {
      SET_RATEPLANS (state, rateplans) {
        Vue.set(state, 'rateplans', rateplans)
      }
    },
    getters: {
      rateplans (state) {
        return state.rateplans
      }
    }
  }
});
