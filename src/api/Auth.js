define(function (require) {
  var config = require('../config');

  return {
    getToken (args) {
      if(!args.password) {
        throw new Error('Auth error: password not found')
      }

      if(!args.login) {
        throw new Error('Auth error: password not found')
      }

      let url = config.apiBaseURI + 'api/rest/customer/v1/auth';
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: {
            login: args.login,
            password: args.password
          }
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Api response error')
        })
        .catch((error) => {
          if (error) {
            console.log(error)
          }
          throw new Error('Api response error')
        })
    }
  };
});
