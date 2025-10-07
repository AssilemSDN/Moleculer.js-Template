const MongooseCrudMixin = require('../../mixins/mongoose-crud.mixin')
const ArticleModel = require('../../data/model/article.model')

module.exports = {
  name: 'articles',
  mixins: [
    MongooseCrudMixin({
      model: ArticleModel,
      collection: 'articles'
    })
  ],
  actions: {
    create: require('./actions/create'),
    getBySlug: require('./actions/get-by-slug'),
    deleteBySlug: require('./actions/delete-by-slug')
  },
  methods: {
    findBySlug: require('./methods/find-by-slug')
  }
}
