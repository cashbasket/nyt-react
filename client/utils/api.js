import axios from 'axios';

export default {
  searchArticles: function(query) {
    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'api-key': process.env.NYT_API_KEY,
        'q': query
      }
    });
  },
  getSavedArticles: function() {
    return axios.get('/api/articles');
  },
  saveArticle: function(articleData) {
    return axios.post('/api/articles', articleData);
  },
  deleteSavedArticle: function(id) {
    return axios.delete(`/api/articles/${id}`);
  },
};
