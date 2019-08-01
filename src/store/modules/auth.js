define(function (require) {
  var Vue = require('vue');
  var authService = require('../../services/Auth.js');

  return {
    state: {
      authToken: '',
      showAuthDialog: false
    },
    actions: {
      setAuthToken ({ commit }, authToken) {
        commit('SET_AUTH_TOKEN', authToken)
      },
      setShowAuthDialog ({ commit }, showDialog) {
        commit('SET_SHOW_AUTH_DIALOG', showDialog)
      },
      async loadAuthToken({ commit }, userData, highPrivacyMode) {
        const token = await authService.getToken(userData);
        commit('SET_AUTH_TOKEN', token)
        if(highPrivacyMode !== true) {
          window.localStorage.setItem('authToken', token);
        }
      }
    },
    mutations: {
      SET_AUTH_TOKEN (state, authToken) {
        Vue.set(state, 'authToken', authToken)
      },
      SET_SHOW_AUTH_DIALOG (state, showDialog) {
        Vue.set(state, 'showAuthDialog', showDialog)
      }
    },
    getters: {
      authToken (state) {
        return state.authToken
      },
      showAuthDialog (state) {
        return state.showAuthDialog
      }
    }
  }
});
