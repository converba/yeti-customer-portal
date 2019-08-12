define(function (require) {
  var Vue = require('vue');
  var accountsService = require('../../services/Accounts.js');

  return {
    state: {
      accounts: []
    },
    actions: {
      loadAccounts ({ commit }, data) {
        accountsService.getAccounts(data)
          .then(function (accountsList) {
            if(accountsList) {
              commit('SET_ACCOUNTS', accountsList)
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
