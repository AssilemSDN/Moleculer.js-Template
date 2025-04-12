const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Ajout d'un index unique pour le slug
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},{
  timestamps: true, // Ajoute `createdAt` et `updatedAt` automatiquement
})

module.exports = mongoose.model('Article', articleSchema)