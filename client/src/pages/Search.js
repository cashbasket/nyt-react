import React, { Component } from 'react';
import API from '../utils/api';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { ArticleList, ArticleItem } from '../components/Article';
import { Input, FormBtn, YearSelect } from '../components/Form';
import Jumbotron from '../components/Jumbotron/Jumbotron';

class Search extends Component {
  state = {
    articles: [],
    alreadySaved: [],
    topic: '',
    startDate: new Date().getFullYear(),
    endDate: new Date().getFullYear(),
    searched: false,
    lastSaved: []
  };

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
      })
      .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    var query = {
      topic: this.state.topic,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    let alreadySavedUrls = [];
    let results;
    API.searchArticles(this.state.topic, this.state.startDate, this.state.endDate)
      .then(res => {
        results = res.data;
        return API.getSavedArticles();  
      })
      .then(res => {
        res.data.map(article => {
          alreadySavedUrls.push(article.url);
        });
        this.setState({ articles: results, alreadySaved: alreadySavedUrls, searched: true, lastSaved: [] });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="col-md-12">
            <div class="text-center">
              <div class="alert alert-info border-info"><i class="fas fa-info-circle"></i> <strong>PRO-TIP:</strong> to view the articles that have been saved, click the button in the lower-right corner.</div>
            </div>
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header text-center"><h4>Search Articles</h4></div>
              <div className="card-body">
                <form>
                  <Row>
                    <Col className="col-md-6">
                      <label>Topic (required)</label>
                      <Input value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="e.g. What's Happenin' Now"
                      />
                    </Col>
                    <Col className="col-md-2">
                      <label>Start Year</label>
                      <YearSelect 
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                        name="startDate"
                      />
                    </Col>
                    <Col className="col-md-2">
                      <label>End Year</label>
                      <YearSelect 
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                        name="endDate"
                      />
                    </Col>
                    <Col className="col-md-2">
                      <FormBtn disabled={!this.state.topic}
                        onClick={this.handleFormSubmit}
                        className="btn btn-dark btn-search">
                        <i className="fas fa-search"></i> Search
                      </FormBtn>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12">
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map((article, index) => (
                  <ArticleItem key={`article-${index + 1}`}>
                    <h3><a href={article.web_url} target="_blank">{article.headline.main}</a></h3>
                    <p>{article.byline.original} <br />
                      <small>Published {moment(article.pub_date).format('M/D/YYYY @ h:mmA')})</small></p>
                    <p>{article.snippet}</p>
                    <Row>
                      <Col className="col-md-6">
                        <a href={article.web_url} className="full-article-link" target="_blank"><i className="fas fa-external-link-alt"></i> Read Full Article</a>
                      </Col>
                      <Col className="col-md-6 col-option">
                        {this.state.alreadySaved.includes(article.web_url) ? (
                          <span className="save-article-link"><i className="fas fa-database"></i> Already Saved</span>
                        ) : !this.state.lastSaved.includes(index + 1) ? (
                          <a key={`save-${index + 1}`} className="save-article-link" onClick={() => this.saveArticle(article.headline.main, article.byline.original, article.web_url, article.snippet, article.pub_date, index + 1)}><i className="fas fa-bookmark"></i> Save This</a>
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
                <Col className="col-md-12">
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
        <div className="action-div">
          <Link to="/saved">
            <FormBtn className="btn btn-action btn-view-saved btn-lg animated infinite pulse"><i className="far fa-bookmark fa-3x"></i></FormBtn>
          </Link>
        </div>
      </Container>
    );
  }
}

export default Search;
