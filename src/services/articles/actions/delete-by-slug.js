/*
  PATH      /src/services/articles/delete-by-slug.js
  ACTION    articles.deleteBySlug
  PATH API  DELETE /articles/:slug
*/

const { MoleculerError } = require('moleculer').Errors

/**
 * @description
 * ACTION : articles.deleteBySlug
 *
 * @param {} ctx                                 > Moleculer action context
 * @param {object} ctx.params                    > Parameters passed to the action
 * @param {String} ctx.params.slug               > The slug of the article (required)
 * @returns {Promise<object>}                    > Return the removed article object
 * @throws {MoleculerError}                      > If the page doesn't exist
 */
const handler = async function (ctx) {
  // 0. Extract params
  const { slug } = ctx.params

  // 2. Check if the article exists
  const article = await this.findBySlug(slug)
  if (!article) {
    throw new MoleculerError(`Page with slug '${slug}' not found.`, 404, 'PAGE_NOT_FOUND')
  }

  // 3. Delete the article from the DB
  await this._remove(ctx, { id: article._id })

  return {
    success: true,
    removedArticle: {
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
