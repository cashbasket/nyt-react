const router = require('express').Router();
const articleRoutes = require('./articles');

// Article routes
router.use('/articles', articleRoutes);
module.exports = router;