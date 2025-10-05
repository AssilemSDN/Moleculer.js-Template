/*
  PATH      /src/services/articles/create.js
  ACTION    articles.create
  PATH API  POST /articles
*/

const { MoleculerError } = require('moleculer').Errors
const slugify = require('slugify')

/**
 * @description
 * ACTION : articles.create
 * Create a new article in the DB. Override the generated action create made by Moleculer db.
 * The title is mandatory. The slug is generated from the title.
 * @param {String} title           > The title of the article (required)
 * @param {String} author          > The author of the article (required)
 * @param {String} content         > The full content of the article (required)
 * @param {Boolean} [dryRun=false] > If true, validates but does not persist the new article object
 * @param {} ctx                   > Moleculer action context
 *
 * @returns {Object}               >
 * @throws {MoleculerError}        > If an article with the same slug already exists
 */
const handler = async function (ctx) {
  // 0. Extract params
  const { title, author, content, dryRun } = ctx.params

  // 1. Generate a URL-friendly slug from the title (max 60 characters)
  const slug = slugify(title, { lower: true, strict: true }).substring(0, 60)

  // 2. Check if the article already exists
  const existingArticle = await this.findBySlug(slug, ctx)
  if (existingArticle) {
    throw new MoleculerError(`Page with slug '${slug}' already exists.`, 409, 'PAGE_ALREADY_EXISTS')
  }

  // 3. Prepare article object to create
  const article = {
    title,
    slug,
    author,
    content
  }

  // 4. Create article in DB
  if (!dryRun) {
    await this._create(ctx, article)
  }
  const message = dryRun
    ? 'Dry run successful. No page created.'
    : 'Page created successfully.'

  return {
    success: true,
    dryRun,
    message,
    article
  }
}

module.exports = {
  handler,
  params: {
    title: { type: 'string', min: 1, max: 60 },
    author: { type: 'string', min: 1, max: 60 },
    content: { type: 'string' },
    dryRun: { type: 'boolean', optional: true, default: false }
  }
}
