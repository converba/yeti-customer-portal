define(function (require) {
  var Request = require('../services/Request');

  return {
    getToken (args) {
      if(!args.password) {
        throw new Error('Auth error: password not found')
      }

      if(!args.login) {
        throw new Error('Auth error: login not found')
      }

      return Request.send({
        api: 'api/rest/customer/v1/auth',
        params: {
          method: 'POST',
          body: {
            auth: {
              login: args.login,
              password: args.password
            }
          }
        }
      }).then(function (result) {
        if(result && result.jwt) {
          return result.jwt
        }
      })
    }
  };
});
