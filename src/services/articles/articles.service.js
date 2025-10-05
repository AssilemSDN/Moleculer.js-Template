const MongooseCrudMixin = require('../../mixins/mongoose-crud.mixin')
const ArticleModel = require('../../data/model/article.model')

module.exports = {
  name: 'articles',
  mixins: [
    MongooseCrudMixin({
      model: ArticleModel,
      collection: 'articles',
      methods: {
        findBySlug: require('./methods/find-by-slug')
      }
    })
  ],
  actions: {
    create: require('./actions/create')
  },
  methods: {
    findBySlug: require('./methods/find-by-slug')
  }
}
