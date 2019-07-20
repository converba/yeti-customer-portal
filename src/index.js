require.config({
  baseUrl: 'lib',
  paths: {
    'core': '../app/index',
    'vue': 'vue.min',
    'vue-router': 'vue-router.min',
    'vuetify': 'vuetify/vuetify',
    'vuex': 'vuex.min'
  }
});

require(['core']);
