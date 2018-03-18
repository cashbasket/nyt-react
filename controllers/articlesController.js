const models = require('../models');
// Defining methods for the articlesController
module.exports = {
  findAll: function(req, res) {
    models.Article
      .find(req.query)
      .sort({ dateAdded: -1 })
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err));
  },
  findByUrl: function(req, res) {
    models.Article
      .findOne({url: req.body.url})
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  save: function(req, res) {
    models.Article
      .create(req.body)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    models.Article
      .findById({ _id: req.params.id })
      .then(article => article.remove())
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  }
};