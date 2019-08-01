define(function (require) {
  var Auth = require('../api/Auth');
  var Accounts = require('../api/Accounts');

  return {
    Auth: Auth,
    Accounts: Accounts
  };
});
