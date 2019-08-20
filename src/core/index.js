define(function (require) {
  var Vue = require('vue');
  var Vuex = require('vuex');
  var store = require('../store/index');
  var AppRoot = require('../core/root');
  var i18n = require('../core/i18n/index');
  var VueMoment = require('vue-moment');
  require('../core/stylesLoader');

  Vue.use(Vuex);
  Vue.use(VueMoment.install);

  return new Vue({
    router: require('../core/router'),
    store: store,
    vuetify: require('../core/vuetify'),
    render: h => h(AppRoot),
    i18n: i18n
  }).$mount(`#app`);
});
