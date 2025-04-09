const ApiGateway = require('moleculer-web')
const {
  port,
  host
} = require('../../config/application.config').moleculer

module.exports = {
  name: 'apiGateway',
  mixins: [ApiGateway],
  settings: {
    port,
    host,
    routes: [{
      path: '/',
      aliases: {
        'GET firstService': {
          action: 'firstService.firstAction'
        }
      }
    }]
  }
}
