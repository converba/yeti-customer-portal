define(function (require) {
  var Request = require('../services/Request');

  return {
    getRates (args) {
      const perPage = args.perPage || '';
      const page = args.page || '';
      return new Promise((resolve, reject) => {
        if(!args.jwt) {
          reject(new Error('Auth error: didn\'t authorized'))
        } else {
          Request.send({
            api: `api/rest/customer/v1/rates?page[size]=${perPage}&page[number]=${page}`,
            params: {
              method: 'GET',
              headers: {
                Authorization: args.jwt,
                'Content-Type': 'application/vnd.api+json'
              }
            }
          }).then(function (response) {
            if(response.data) {
              resolve({
                rates: response.data,
                totalCount: response.meta['total-count']
              })
            }
          }).catch((e) => {
            reject(new Error('Auth error: didn\'t authorized'))
          })
        }
      });
    },
    checkRate (args) {
      return new Promise((resolve, reject) => {
        if(!args.jwt || typeof(args.jwt) === 'undefined') {
          reject(new Error('Auth error: didn\'t authorized'));
          return;
        }

        if(!args.rateplanId) {
          reject(new Error('checkRate error: rateplan id not found'));
          return;
        }

        if(!args.number) {
          reject(new Error('checkRate error: number not found'));
          return;
        }

        Request.send({
          api: 'api/rest/customer/v1/check-rate',
          params: {
            method: 'POST',
            headers: {
              Authorization: args.jwt,
              'Content-Type': 'application/vnd.api+json'
            },
            body: {
              data: {
                type: 'check-rates',
                attributes: {
                  'rateplan-id': args.rateplanId,
                  'number': args.number
                }
              }
            }
          }
        }).then(function (response) {
          if(response.data) {
            resolve(response.data)
          }
        }).catch((e) => {
          reject(new Error('Auth error: didn\'t authorized'))
        })
      });
    }
  };
});
