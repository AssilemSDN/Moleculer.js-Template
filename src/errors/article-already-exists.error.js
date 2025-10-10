/*
  PATH      /src/errors/article-already-exists.error.js
  ERROR     ArticleAlreadyExistsError
  TYPE      ARTICLE_ALREADY_EXISTS
  CODE      409
*/
const { MoleculerError } = require('moleculer').Errors

class ArticleAlreadyExistsError extends MoleculerError {
  constructor (slug) {
    const message = `Article with slug '${slug}' already exists.`
    super(message, 409, 'ARTICLE_ALREADY_EXISTS')
  }
}

module.exports = ArticleAlreadyExistsError
