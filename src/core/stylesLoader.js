define(function (require) {
  const config = require('../config');
  const plugins = require('../plugins/index');

  // Add CSS of modules
  if(plugins && plugins.modules) {
    let modules = plugins.modules;
    let styleNode = document.createElement('style');
    let stylesStr = '';
    for(let i=0, len = modules.length; i<len; i++) {
      stylesStr += '@import url("' +
        './plugins/' + modules[i] + '/' + modules[i] + '.css'
        + '");'
    }
    styleNode.innerHTML = stylesStr;
    document.body.appendChild(styleNode);
  }

  // Add CSS of custom styles
  if(config && config.theme && config.theme.hasOwnProperty('customCSSPath')) {
    let link = document.createElement('link');
    link.href = config.theme.customCSSPath;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
});
