define(function (require) {
  var Auth = require('../api/Auth');
  var Accounts = require('../api/Accounts');
  var Cdrs = require('../api/Cdrs');
  var Rateplans = require('../api/Rateplans');
  var Rates = require('../api/Rates');

  return {
    Auth: Auth,
    Accounts: Accounts,
    Cdrs: Cdrs,
    Rateplans: Rateplans,
    Rates: Rates
  };
});
