/*
  PATH      /src/services/articles/get-by-slug.js
  ACTION    articles.getBySlug
  PATH API  GET /articles/:slug
*/
const ArticleNotFoundError = require('../../../errors/article-not-found.error')

/**
 * @description
 * ACTION : articles.getBySlug
 * Get an article from its slug ID.
 * @param {} ctx                                 > Moleculer action context
 * @param {object} ctx.params                    > Parameters passed to the action
 * @param {String} ctx.params.slug               > The slug of the article (required)
 * @returns {Promise<object>}                    > Return the article assosicated to the unique ID slug
 * @throws {MoleculerError}                      > If the page doesn't exist
 */
const handler = async function (ctx) {
  // 0. Extract params
  const { slug } = ctx.params

  // 1. Check if the article exists
  this.logger.info(`Fetching article with slug '${slug}'`)
  const article = await this.findBySlug(slug)
  if (!article) {
    throw new ArticleNotFoundError(slug)
  }

  return {
    success: true,
    article: {
      title: article.title,
      slug: article.slug,
      author: article.author,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt
    }
  }
}

module.exports = {
  handler,
  params: {
    slug: { type: 'string', min: 1, max: 60 }
  }
}
