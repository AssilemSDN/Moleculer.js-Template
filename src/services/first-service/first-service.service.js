module.exports = {
  name: 'firstService',
  actions: {
    firstAction: require('./actions/first-action')
  },
  methods: {
    firstMethod: require('./methods/first-method')
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