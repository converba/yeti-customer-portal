define(function (require) {
  var config = require('../config');
  var _ = require('lodash');

  let Request = function (args) {
    let url = config.apiBaseURI + args.api;
    let requestParams = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if(args.params && args.params.hasOwnProperty('body')) {
      args.params.body = JSON.stringify(args.params.body);
    }
    requestParams = _.merge(requestParams, args.params);
    return fetch(url, requestParams)
  };

  return {
    send (args) {
      // api, method, postData
      if(!args.api) {
        throw new Error('Request error: api not found')
      }

      return Request(args)
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
