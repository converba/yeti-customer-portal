define(function (require) {
  var Request = require('../services/Request');

  return {
    getRateplans (jwt) {
      if(typeof(jwt) === 'undefined') {
        throw new Error('Auth error: didn\'t authorized')
      } else {
        return Request.send({
          api: 'api/rest/customer/v1/rateplans',
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
