define(function (require) {
  var Vue = require('vue');
  var accountsService = require('../../services/Accounts.js');

  return {
    state: {
      accounts: []
    },
    actions: {
      async loadAccounts ({ commit }, data) {
        let accountsList = await accountsService.getAccounts(data);
        commit('SET_ACCOUNTS', accountsList)
      },
      setAccounts ({ commit }, accountsList) {
        commit('SET_ACCOUNTS', accountsList)
      }
    },
    mutations: {
      SET_ACCOUNTS (state, accountsList) {
        Vue.set(state, 'accounts', accountsList)
      }
    },
    getters: {
      accounts (state) {
        return state.accounts
      }
    }
  }
});
