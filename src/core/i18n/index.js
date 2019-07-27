define(function (require) {
  var config = require('../../config');
  var Vue = require('vue');
  var VueI18n = require('vue-i18n');
  var plugins = require('../../plugins/index');
  var _ = require('lodash');

  var ruRU = require('./ru-RU');
  var enUS = require('./en-US');

  var dict =  {
    'ru-RU': ruRU,
    'en-US': enUS
  };

  if(plugins && plugins.modules) {
    let modulesI18nArr = plugins.modules.map(function (name) {
      return '../../plugins/' + name + '/i18n';
    });

    require(modulesI18nArr, function (results) {
      for (let i = 0, len = arguments.length; i < len; i++) {
        for (let k in arguments[i]) if (arguments[i].hasOwnProperty(k)) {
          dict = _.merge(dict, arguments[i]);
        }
      }
    });
  }

  Vue.use(VueI18n);

  return new VueI18n({
    locale: config.language,
    fallbackLocale: 'en-US',
    messages: dict
  })
});
