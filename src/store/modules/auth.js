define(function (require) {
  var Vue = require('vue');
  var authService = require('../../services/Auth.js');

  return {
    state: {
      authToken: '',
      showAuthDialog: false,
      isAuthorized: false
    },
    actions: {
      setAuthToken ({ commit }, authToken) {
        commit('SET_AUTH_TOKEN', authToken)
      },
      setShowAuthDialog ({ commit }, showDialog) {
        commit('SET_SHOW_AUTH_DIALOG', showDialog)
      },
      setAuthorizedStatus ({ commit }, isAuthorized) {
        commit('SET_AUTHORIZED_STATUS', isAuthorized)
      },
      loadAuthToken({ commit }, userData, highPrivacyMode) {
        window.localStorage.removeItem('authToken');
        try {
          authService.getToken(userData)
            .then(function (token) {
              if(token) {
                commit('SET_AUTH_TOKEN', token);
                commit('SET_AUTHORIZED_STATUS', true);
                if(highPrivacyMode !== true) {
                  window.localStorage.setItem('authToken', token);
                }
              } else {
                commit('SET_AUTH_TOKEN', '');
                commit('SET_AUTHORIZED_STATUS', false);
              }
            });
        } catch (e) {
          commit('SET_AUTH_TOKEN', '');
          commit('SET_AUTHORIZED_STATUS', false);
        }
      }
    },
    mutations: {
      SET_AUTH_TOKEN (state, authToken) {
        Vue.set(state, 'authToken', authToken)
      },
      SET_SHOW_AUTH_DIALOG (state, showDialog) {
        Vue.set(state, 'showAuthDialog', showDialog)
      },
      SET_AUTHORIZED_STATUS (state, isAuthorized) {
        Vue.set(state, 'isAuthorized', isAuthorized)
      }
    },
    getters: {
      authToken (state) {
        return state.authToken || window.localStorage.getItem('authToken')
      },
      isAuthorized (state) {
        return state.isAuthorized
      },
      showAuthDialog (state) {
        return state.showAuthDialog
      }
    }
  }
});
