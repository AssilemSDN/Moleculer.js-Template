module.exports = {
  "routes": [
    {
      "path": "/api/v1/articles",
      "aliases": {
        "POST /": "articles.create",
        "GET /": "articles.list",
        "GET /:slug": "articles.getBySlug",
        "PUT /:slug": "articles.updateBySlug",
        "DELETE /:slug": "articles.deleteBySlug"
      },
      "bodyParsers": {
        "json": true
      }
    }
  ]
}
