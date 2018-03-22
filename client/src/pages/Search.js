import React, { Component } from 'react';
import API from '../utils/api';
import moment from 'moment';
import { ArticleList, ArticleItem } from '../components/Article';
import { Input, FormBtn, YearSelect } from '../components/Form';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      alreadySaved: [],
      topic: '',
      startDate: new Date().getFullYear(),
      endDate: new Date().getFullYear(),
      searched: false,
      lastSaved: []
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = (headline, byline, url, snippet, datePublished, index) => {
    const articleData = {
      headline: headline,
      byline: byline,
      url: url,
      snippet: snippet,
      datePublished: datePublished
    };
    API.saveArticle(articleData)
      .then(res => {
        const lastSaved = this.state.lastSaved;
        lastSaved.push(index);
        this.setState({ lastSaved: lastSaved });
        this.props.send(res.data.headline);
      })
      .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const alreadySavedUrls = [];
    let results;
    const searchingDiv = document.getElementById('searching');
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'none';
    searchingDiv.style.display = 'block';
    API.searchArticles(this.state.topic, this.state.startDate, this.state.endDate)
      .then(res => {
        results = res.data;
        return API.getSavedArticles();  
      })
      .then(savedArticles => {
        savedArticles.data.map(article => {
          return alreadySavedUrls.push(article.url);
        });
        searchingDiv.style.display = 'none';
        resultsDiv.style.display = 'block';
        this.setState({ articles: results, alreadySaved: alreadySavedUrls, searched: true, lastSaved: [] });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="12">
            <p className="lead text-center"><i className="fas fa-info-circle"></i> Enter your search parameters below, and then click the "Submit" button.</p>
            <div className="card text-white bg-secondary mb-3">
              <div className="card-body">
                <form>
                  <Row>
                    <Col md="6">
                      <label>Topic (required)</label>
                      <Input value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="e.g. stuff about things"
                      />
                    </Col>
                    <Col md="2">
                      <label>Start Year</label>
                      <YearSelect 
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                        name="startDate"
                      />
                    </Col>
                    <Col md="2">
                      <label>End Year</label>
                      <YearSelect 
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                        name="endDate"
                      />
                    </Col>
                    <Col md="2">
                      <FormBtn disabled={!this.state.topic}
                        onClick={this.handleFormSubmit}
                        className="btn btn-dark btn-search">
                        Submit
                      </FormBtn>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="searching">
          <Col md="12">
            <div className="card article-card bg-dark text-white text-center">
              <div className="card-body">
                <i className="fas fa-spinner fa-spin fa-3x no-results-icon"></i> <h5 className="card-text">Searching. Please wait...</h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="results">
          <Col md="12">
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map((article, index) => (
                  <ArticleItem key={`article-${index + 1}`}>
                    <h3><a href={article.web_url} target="_blank">{article.headline.main}</a></h3>
                    <p>{article.byline && article.byline.original ? 
                      (<span>{article.byline.original}<br /></span>)
                      : ''}
                    <small>Published {moment(article.pub_date).format('M/D/YYYY @ h:mmA')}</small></p>
                    <p>{article.snippet}</p>
                    <Row>
                      <Col md="6">
                        <a href={article.web_url} className="full-article-link" target="_blank"><i className="fas fa-external-link-alt"></i> Read Full Article</a>
                      </Col>
                      <Col md="6" className="col-option">
                        {this.state.alreadySaved.includes(article.web_url) ? (
                          <span className="save-article-link"><i className="fas fa-database"></i> Already Saved</span>
                        ) : !this.state.lastSaved.includes(index + 1) ? (
                          <a key={`save-${index + 1}`} className="save-article-link" onClick={() => this.saveArticle(article.headline.main, (article.byline && article.byline.original ? article.byline.original : null), article.web_url, article.snippet, article.pub_date, index + 1)}><i className="fas fa-bookmark"></i> Save Article</a>
                        ) : (
                          <span className="save-article-link"><i className="fas fa-check-circle"></i> Saved!</span>
                        )}
                      </Col>
                    </Row>
                  </ArticleItem>
                ))}
              </ArticleList> 
            ) : (
              <Row>
                <Col md="12">
                  {this.state.searched ? (
                    <div className="card text-white bg-danger mb-3">
                      <div className="card-body text-center">
                        <i className="far fa-frown fa-4x no-results-icon"></i>
                        <h5 className="card-text">Your search returned no results.</h5>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;