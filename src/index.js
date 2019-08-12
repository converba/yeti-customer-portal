require.config({
  baseUrl: 'lib',
  paths: {
    'core': '../core/index',
    'vue': 'vue.min',
    'vue-router': 'vue-router.min',
    'vuetify': 'vuetify/vuetify.min',
    'vuex': 'vuex.min',
    'vue-i18n': 'vue-i18n.min',
    'lodash': 'lodash.min',
    'vue-moment': 'vue-moment.min'
  }
});

require(['core']);
