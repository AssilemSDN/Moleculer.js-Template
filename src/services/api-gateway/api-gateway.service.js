/*
  PATH      /src/services/api-gateway/api-gateway.service.js
*/

const ApiGateway = require('moleculer-web')
const { port, host } = require('../../config/application.config').moleculer

module.exports = {
  name: 'apiGateway',
  mixins: [ApiGateway],
  settings: {
    port,
    host,
    cors: {
      origin: '*', // Here to specify frontend
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: [],
      credentials: false,
      maxAge: 3600
    },
    routes: [{
      path: '/api/v1',
      aliases: {
        'POST /articles': 'articles.create',
        'GET /articles': 'articles.list',
        'GET /articles/:slug': 'articles.getBySlug',
        'PUT /articles/:slug': 'article.updateBySlug',
        'DELETE /articles/:slug': 'articles.deleteBySlug'
      },
      bodyParsers: {
        json: true
      }
    }]
  },
  started () {
    this.logger.info(`API Gateway started at http://${host}:${port}/api/v1`)
  }
}
