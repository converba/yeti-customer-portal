define(function (require) {
  var Vue = require('vue');
  var ratesService = require('../../services/Rates.js');

  return {
    state: {
      rates: [],
      checkedRates: []
    },
    actions: {
      loadRates ({ commit }, reqData) {
        ratesService.getRates(reqData)
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
      checkRate ({ commit }, data) {
        ratesService.checkRate(data)
          .then(function (responseData) {
            if(responseData
              && responseData.attributes
              && responseData.attributes.hasOwnProperty('rates')) {
              commit('SET_CHECKED_RATES', responseData.attributes.rates)
            }
          })
          .catch((error) => {
            /* if (error) {
              commit('SET_AUTH_TOKEN', '');
              commit('SET_AUTHORIZED_STATUS', false);
              commit('SET_SHOW_AUTH_DIALOG', true);
              window.localStorage.removeItem('authToken');
            } */
          });
      },
      setRates ({ commit }, rates) {
        commit('SET_RATES', rates)
      },
      setCheckedRates ({ commit }, checkedRates) {
        commit('SET_CHECKED_RATES', checkedRates)
      }
    },
    mutations: {
      SET_RATES (state, rates) {
        Vue.set(state, 'rates', rates)
      },
      SET_CHECKED_RATES (state, checkedRates) {
        Vue.set(state, 'checkedRates', checkedRates)
      }
    },
    getters: {
      rates (state) {
        return state.rates
      },
      checkedRates (state) {
        return state.checkedRates
      }
    }
  }
});
