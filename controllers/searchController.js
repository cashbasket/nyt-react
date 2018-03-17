const axios = require('axios');

// Defining methods for the articlesController
module.exports = {
  searchArticles: function(req, res) {
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'api-key': process.env.NYT_API_KEY,
        'q': req.query.topic,
        'page': '0',
        'begin_date': req.query.startDate + '0101',
        'end_date': req.query.endDate + '1231'
      }
    })
      .then(data => {
        res.json(data.data.response.docs);
      })
      .catch(err => res.status(422).json(err));
  },
};