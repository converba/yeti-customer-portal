define(function (require) {
  var Apps = require('../components/Apps');

  return {
    name: `Home`,
    components: {
      Apps: Apps
    },
    template: `
      <apps/>
    `,
  };
});
