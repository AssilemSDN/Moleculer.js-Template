/*
  PATH      /src/services/articles/methods/find-by-slug.js
  METHOD    findBySlug
*/
const { MoleculerError } = require('moleculer').Errors

const handler = async function (slug) {
  this.logger.info(`Finding article by slug: '${slug}'`)

  slug = slug.trim()
  if (!slug || typeof slug !== 'string') {
    throw new MoleculerError('The required parameter slug should be a non-empty string', 400, 'INVALID_PARAMS')
  }

  return this.adapter.findOne({ slug })
}

module.exports = handler
