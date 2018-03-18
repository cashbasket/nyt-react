const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  byline: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  snippet: {
    type: String,
    required: false
  },
  datePublished: {
    type: Date,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
