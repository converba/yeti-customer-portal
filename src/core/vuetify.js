define(function (require) {
  var Vue = require('vue');
  var Vuetify = require('vuetify');
  var config = require('../config');

  Vue.use(Vuetify);

  let colors = {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  };

  if(config && config.theme && config.theme.hasOwnProperty('colors')) {
    colors = config.theme.colors
  }

 return new Vuetify({
    theme: {
      themes: {
        light: colors
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  });
});
