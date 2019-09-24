define(function (require) {
  var Request = require('../services/Request');

  return {
    getRates (args) {
      const perPage = args.perPage || '';
      const page = args.page || '';
      if(!args.jwt) {
        throw new Error('Auth error: didn\'t authorized')
      }

      return Request.send({
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
          return {
            rates: response.data,
            totalCount: response.meta['total-count']
          }
        }
      })
    },
    checkRate (args) {
      if(!args.jwt || typeof(args.jwt) === 'undefined') {
        throw new Error('Auth error: didn\'t authorized')
      }

      if(!args.rateplanId) {
        throw new Error('checkRate error: rateplan id not found')
      }

      if(!args.number) {
        throw new Error('checkRate error: number not found')
      }

      return Request.send({
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
          return response.data
        }
      })
    }
  };
});
