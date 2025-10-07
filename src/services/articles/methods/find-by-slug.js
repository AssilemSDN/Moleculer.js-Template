/*
  PATH      /src/services/articles/methods/find-by-slug.js
  METHOD    findBySlug
*/
const handler = async function (slug) {
  if (!slug || typeof slug !== 'string') {
    throw new Error('The required parameter slug should be a non-empty string')
  }
  // Si aucune page, alors null
  return this.adapter.findOne({ slug })
}

module.exports = handler
