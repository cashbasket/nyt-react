const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: false
  },
  datePosted: {
    type: Date,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
