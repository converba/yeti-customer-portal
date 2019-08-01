require.config({
  baseUrl: 'lib',
  paths: {
    'core': '../core/index',
    'vue': 'vue.min',
    'vue-router': 'vue-router.min',
    'vuetify': 'vuetify/vuetify',
    'vuex': 'vuex.min',
    'vue-i18n': 'vue-i18n.min',
    'lodash': 'lodash.min'
  }
});

require(['core']);
