define(function (require) {
  var Vue = require('vue');
  var ratesService = require('../../services/Rates.js');

  return {
    state: {
      rates: []
    },
    actions: {
      loadRates ({ commit }, data) {
        ratesService.getRates(data)
          .then(function (rates) {
            if(rates) {
              commit('SET_RATES', rates)
            }
          })
          .catch((error) => {
            if (error) {
              commit('SET_AUTH_TOKEN', '');
              commit('SET_AUTHORIZED_STATUS', false);
              commit('SET_SHOW_AUTH_DIALOG', true);
              window.localStorage.removeItem('authToken');
            }
          });
      },
      setRates ({ commit }, rates) {
        commit('SET_RATES', rates)
      }
    },
    mutations: {
      SET_RATES (state, rates) {
        Vue.set(state, 'rates', rates)
      }
    },
    getters: {
      rates (state) {
        return state.rates
      }
    }
  }
});
