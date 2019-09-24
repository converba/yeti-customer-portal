define(function (require) {
  var Vue = require('vue');
  var ratesService = require('../../services/Rates.js');

  return {
    state: {
      rates: [],
      ratesTotal: 0,
      checkedRates: []
    },
    actions: {
      loadRates ({ commit }, reqData) {
        try {
          ratesService.getRates(reqData)
            .then(function (data) {
              if(data.rates && data.totalCount) {
                commit('SET_RATES', data.rates);
                commit('SET_RATES_TOTAL', data.totalCount)
              }
            })
        } catch (e) {
          commit('SET_AUTH_TOKEN', '');
          commit('SET_AUTHORIZED_STATUS', false);
          commit('SET_SHOW_AUTH_DIALOG', true);
          window.localStorage.removeItem('authToken');
        }
      },
      checkRate ({ commit }, data) {
        try {
          ratesService.checkRate(data)
            .then(function (responseData) {
              if(responseData
                && responseData.attributes
                && responseData.attributes.hasOwnProperty('rates')) {
                commit('SET_CHECKED_RATES', responseData.attributes.rates)
              }
            })
        } catch (e) {
          commit('SET_AUTH_TOKEN', '');
          commit('SET_AUTHORIZED_STATUS', false);
          commit('SET_SHOW_AUTH_DIALOG', true);
          window.localStorage.removeItem('authToken');
        }
      },
      setRates ({ commit }, rates) {
        commit('SET_RATES', rates)
      },
      setRatesTotal ({ commit }, ratesTotal) {
        commit('SET_RATES_TOTAL', ratesTotal)
      },
      setCheckedRates ({ commit }, checkedRates) {
        commit('SET_CHECKED_RATES', checkedRates)
      }
    },
    mutations: {
      SET_RATES (state, rates) {
        Vue.set(state, 'rates', rates)
      },
      SET_RATES_TOTAL (state, ratesTotal) {
        Vue.set(state, 'ratesTotal', ratesTotal)
      },
      SET_CHECKED_RATES (state, checkedRates) {
        Vue.set(state, 'checkedRates', checkedRates)
      }
    },
    getters: {
      rates (state) {
        return state.rates
      },
      ratesTotal (state) {
        return state.ratesTotal
      },
      checkedRates (state) {
        return state.checkedRates
      }
    }
  }
});
