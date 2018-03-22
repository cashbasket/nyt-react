import React, { Component } from 'react';
import { ArticleList, ArticleItem } from '../components/Article';
import API from '../utils/api';
import moment from 'moment';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Saved extends Component {
  state = {
    articles: [],
    loaded: false
  };

  loadArticles = () => {
    API.getSavedArticles()
      .then(savedArticles => {
        this.setState({articles: savedArticles.data, loaded: true});
      }
      )
      .catch(err => 
        console.log(err)
      );
  }

  deleteArticle = articleId => {
    API.deleteSavedArticle(articleId)
      .then(deletedArticle => {
        this.loadArticles();
      })
      .catch(err =>
        console.log(err)
      );
  }

  componentDidMount = () => {
    this.loadArticles();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="12">
            <div className="card article-card bg-secondary text-white">
              <div className="card-body">
                <h2 className="text-center"><strong>SAVED ARTICLES</strong></h2>
              </div>
            </div>
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map((article, index) => (
                  <ArticleItem key={`article-${article._id}`}>
                    <h3><a href={article.url} target="_blank">{article.headline}</a></h3>
                    <p>{article.byline ? 
                      (<span>{article.byline}<br /></span>)
                      : ''}
                    <small>Published {moment(article.datePublished).format('M/D/YYYY @ h:mmA')} <em>(and saved {moment(article.dateAdded).format('M/D/YYYY @ h:mmA')})</em></small></p>
                    <p>{article.snippet}</p>
                    <Row>
                      <Col md="6">
                        <a href={article.url} className="full-article-link" target="_blank"><i className="fas fa-external-link-alt"></i> Read Full Article</a>
                      </Col>
                      <Col md="6" className="col-option">
                        <a key={`delete-${index + 1}`} className="delete-article-link" onClick={() => this.deleteArticle(article._id)}><i className="fas fa-trash"></i> Delete</a>
                      </Col>
                    </Row>
                  </ArticleItem>
                ))}
              </ArticleList>
            ) : (
              <Row>
                <Col md="12">
                  {this.state.loaded ? (
                    <div className="card text-white bg-danger mb-3">
                      <div className="card-body text-center">
                        <i className="far fa-frown fa-4x no-results-icon"></i>
                        <h5 className="card-text">There are no saved articles.</h5>
                      </div>
                    </div>
                  ) : (
                    <div className="card bg-light mb-3">
                      <div className="card-body text-center">
                        <i className="fas fa-spinner fa-spin fa-4x no-results-icon"></i>
                        <h5 className="card-text">Loading articles...</h5>
                      </div>
                    </div>
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

export default Saved;
