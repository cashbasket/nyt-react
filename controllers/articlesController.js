const models = require('../models');
// Defining methods for the articlesController
module.exports = {
  findAll: function(req, res) {
    models.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    models.Article
      .findById(req.params.id)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    models.Article
      .create(req.body)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    models.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
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