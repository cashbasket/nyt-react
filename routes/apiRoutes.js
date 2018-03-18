const router = require('express').Router();
const articlesController = require('../controllers/articlesController');

router.route('/articles')
  .get(articlesController.findAll)
  .post(articlesController.save)
  .delete(articlesController.remove);

router.route('/articles/find')
  .get(articlesController.findByUrl);
  
module.exports = router;