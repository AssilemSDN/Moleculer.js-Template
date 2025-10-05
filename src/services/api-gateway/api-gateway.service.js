const ApiGateway = require('moleculer-web')
const { port, host } = require('../../config/application.config').moleculer

module.exports = {
  name: 'apiGateway',
  mixins: [ApiGateway],
  settings: {
    port,
    host,
    routes: [{
      path: '/',
      aliases: {
        'POST articles': {
          action: 'articles.create'
        }
      },
      bodyParsers: {
        json: true,
        urlencoded: { extended: true }
      }
    }]
  }
}
