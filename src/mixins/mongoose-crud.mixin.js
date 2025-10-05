const DbService = require('moleculer-db')
const MongooseAdapter = require('moleculer-db-adapter-mongoose')
const { url, user, pass } = require('../config/application.config').db

module.exports = ({ model, collection }) => ({
  mixins: [DbService],
  adapter: new MongooseAdapter(url, { user, pass }),
  model,
  settings: {
    collection
  },
  hooks: {
    before: {
      '*' (ctx) {
        this.logger.info(`[${ctx.action.name}] ctx.params:`, JSON.stringify(ctx.params, null, 2))
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
