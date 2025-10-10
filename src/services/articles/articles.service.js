/*
  PATH      /src/services/articles/articles.service.js
  Handles CRUD operations for articles collection using MongoDB.
*/
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
    deleteBySlug: require('./actions/delete-by-slug'),
    updateBySlug: require('./actions/update-by-slug')
  },
  methods: {
    findBySlug: require('./methods/find-by-slug')
  }
}
