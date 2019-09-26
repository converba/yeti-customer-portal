define(function (require) {
  var Request = require('../services/Request');

  return {
    getCdrs(jwt) {
      return new Promise((resolve, reject) => {
        if (!jwt || typeof(jwt) === 'undefined') {
          reject(new Error('Auth error: didn\'t authorized'))
        } else {
          Request.send({
            api: 'api/rest/customer/v1/cdrs',
            params: {
              method: 'GET',
              headers: {
                Authorization: jwt
              }
            }
          }).then(function (response) {
            if (response.data) {
              resolve(response.data)
            }
          }).catch((e) => {
            reject(new Error('Auth error: didn\'t authorized'))
          })
        }
      })
    }
  }
});
