define(function (require) {
  var Request = require('../services/Request');

  return {
    getAccounts (jwt) {
      if(!jwt || typeof(jwt) === 'undefined') {
        throw new Error('Auth error: didn\'t authorized')
      } else {
        return Request.send({
          api: 'api/rest/customer/v1/accounts',
          params: {
            method: 'GET',
            headers: {
              Authorization: jwt
            }
          }
        }).then(function (response) {
          if(response.data) {
            return response.data
          }
        })
      }
    }
  };
});
