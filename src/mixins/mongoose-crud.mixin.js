const DbService = require('moleculer-db')
const MongooseAdapter = require('moleculer-db-adapter-mongoose')
const { nodeEnv } = require('../config/application.config')
const { url, user, pass } = require('../config/application.config').db

module.exports = ({ model, collection }) => ({
  mixins: [DbService],
  adapter: new MongooseAdapter(url, {
    user,
    pass,
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000
  }),
  model,
  settings: {
    collection
  },
  hooks: {
    before: {
      '*' (ctx) {
        if (nodeEnv === 'development') {
          this.logger.info(`[${ctx.action.name}] ctx.params:`, JSON.stringify(ctx.params, null, 2)) // Can log possibly sensitive data
        }
      }
    },
    error: {
      '*' (ctx, err) {
        if (nodeEnv === 'development') {
          this.logger.error(`[${ctx.action.name}] Error:`, err.message)
        }
        throw new Error('Database operation failed')
      }
    }
  },

  created () {
    this.logger.info(`Service '${this.name}' created.`)
  },
  started () {
    this.logger.info(`Service '${this.name}' started.`)
  },
  stopped () {
    this.logger.info(`Service '${this.name}' stopped.`)
  }
})
