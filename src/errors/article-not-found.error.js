/*
  PATH      /src/errors/article-not-found.error.js
  ERROR     ArticleNotFoundError
  TYPE      ARTICLE_NOT_FOUND
  CODE      404
*/
const { MoleculerError } = require('moleculer').Errors

class ArticleNotFoundError extends MoleculerError {
  constructor (slug) {
    const message = `Article with slug '${slug}' doesn't exist.`
    super(message, 404, 'ARTICLE_NOT_FOUND')
  }
}

module.exports = ArticleNotFoundError
