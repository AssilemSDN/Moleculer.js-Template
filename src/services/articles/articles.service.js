const DbService = require('moleculer-db')
const MongooseAdapter = require('moleculer-db-adapter-mongoose')
const ArticleModel = require('../../data/model/article.model')
const { url, user, pass } = require('../../config/application.config').db

module.exports = {
  name: 'articles',
  mixins: [DbService],
  adapter: new MongooseAdapter(url, {
    user,
    pass
  }),
  actions: {
    create: require('./actions/create')
  },
  methods: {

  },
  model: ArticleModel,
  settings: {
    collection: 'Articles'
  },
  created() {
    try {
      /* Here : initialisation, setup, ... */
    } catch (error) {
      this.logger.error('Error during service creation:', error)
    }
  },
  started() {
    try {
      /* Here : scheduled tasks, open connections, ... */
    } catch (error) {
      this.logger.error('Error during service startup:', error)
    }
  },
  stopped() {
    try {
      /* Here : clean up, close connections, ... */
    } catch (error) {
      this.logger.error('Error during service shutdown:', error)
    }
  }
}