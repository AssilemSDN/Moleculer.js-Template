/*
  PATH      /src/data/model/article.model.js
*/
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

articleSchema.index({ author: 1 })
articleSchema.index({ title: 'text' })

module.exports = mongoose.model('Article', articleSchema)
