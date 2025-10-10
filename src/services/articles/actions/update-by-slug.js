/*
  PATH      /src/services/articles/update-by-slug.js
  ACTION    articles.updateBySlug
  PATH API  PUT /articles/:slug
*/

const slugify = require('slugify')
const ArticleAlreadyExistsError = require('../../../errors/article-already-exists.error')
const ArticleNotFoundError = require('../../../errors/article-not-found.error')

/**
 * @description
 * ACTION : articles.updateBySlug
 * Update an article in the DB.
 * The title is optional. The slug is regenerated from the new title.
 * @param {} ctx                                 > Moleculer action context
 * @param {object} ctx.params                    > Parameters passed to the action
 * @param {String} ctx.params.title              > The title of the article (optional)
 * @param {String} ctx.params.author             > The author of the article (optional)
 * @param {String} ctx.params.content            > The full content of the article (optional)
 * @param {Boolean} [ctx.params.dryRun=false]    > If true, validates but does not persist the new article object
 * @returns {Promise<object>}                    > Return an object : success status, dryRun flag, message, and the article data
 * @throws {MoleculerError}                      > If an article with the same slug already exists
 */
const handler = async function (ctx) {
  const { slug } = ctx.params // original slug
  const { title, author, content, dryRun } = ctx.params

  // 1. Retrieve the article to update
  const article = await this.findBySlug(slug)
  if (!article) {
    throw new ArticleNotFoundError(slug)
  }

  // 2. Build the updated fields
  const updateFields = {}

  if (title && title !== article.title) {
    updateFields.title = title
    // Generate new slug if title has been modified
    const newSlug = slugify(title, { lower: true, strict: true }).substring(0, 60)

    // Check if the new slug is already used by another existing article
    if (newSlug !== article.slug) {
      const existingArticle = await this.findBySlug(newSlug)
      if (existingArticle) {
        throw new ArticleAlreadyExistsError(slug)
      }
      updateFields.slug = newSlug
    }
  }

  if (author) updateFields.author = author
  if (content) updateFields.content = content

  if (Object.keys(updateFields).length === 0) {
    return {
      success: true,
      dryRun,
      message: 'No fields to update.',
      article: {
        title: article.title,
        slug: article.slug,
        author: article.author,
        content: article.content
      }
    }
  }
  // 3. Update
  if (!dryRun) {
    await this._update(ctx, { id: article._id, ...updateFields })
  }

  return {
    success: true,
    dryRun,
    message: dryRun ? 'Dry run successful. No page updated.' : 'Page updated successfully.',
    article: {
      title: updateFields.title ?? article.title,
      slug: updateFields.slug ?? article.slug,
      author: updateFields.author ?? article.author,
      content: updateFields.content ?? article.content
    }
  }
}

module.exports = {
  handler,
  params: {
    slug: { type: 'string', min: 1, max: 60 }, // Le slug original obligatoire pour trouver l'article
    title: { type: 'string', min: 1, max: 60, optional: true },
    author: { type: 'string', min: 1, max: 60, optional: true },
    content: { type: 'string', optional: true },
    dryRun: { type: 'boolean', optional: true, default: false }
  }
}
