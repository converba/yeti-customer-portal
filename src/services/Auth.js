define(function (require) {
  var Request = require('../services/Request');

  return {
    getToken (args) {
      return new Promise((resolve, reject) => {
        if(!args.password) {
          reject(new Error('Auth error: password not found'));
          return
        }

        if(!args.login) {
          reject(new Error('Auth error: login not found'));
          return;
        }

        Request.send({
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
            resolve(result.jwt)
          }
        }).catch((e) => {
          reject(new Error('Auth error: didn\'t authorized'))
        })
      });
    }
  };
});
