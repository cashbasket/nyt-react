import axios from 'axios';

export default {
  searchArticles: function(topic, startDate, endDate) {
    return axios.get('/search', { params: { topic: topic, startDate: startDate, endDate: endDate } });
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
  findArticleByUrl: function(url) {
    return axios.get('/api/articles/find');
  }
};