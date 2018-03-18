import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { ArticleList, ArticleItem } from '../components/Article';
import { FormBtn } from '../components/Form';
import API from '../utils/api';
import moment from 'moment';

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
          <Col className="col-md-12">
            <div class="card article-card bg-secondary text-white">
              <div class="card-body">
                <h2 class="text-center"><strong>SAVED ARTICLES</strong></h2>
              </div>
            </div>
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map((article, index) => (
                  <ArticleItem key={`article-${article._id}`}>
                    <h3><a href={article.url} target="_blank">{article.headline}</a></h3>
                    <p>{article.byline}<br />
                      <small>Published {moment(article.datePublished).format('M/D/YYYY @ h:mmA')} <em>(and saved {moment(article.dateAdded).format('M/D/YYYY @ h:mmA')})</em></small></p>
                    <p>{article.snippet}</p>
                    <Row>
                      <Col className="col-md-6">
                        <a href={article.url} className="full-article-link" target="_blank"><i className="fas fa-external-link-alt"></i> Read Full Article</a>
                      </Col>
                      <Col className="col-md-6 col-option">
                        <a key={`delete-${index + 1}`} className="delete-article-link" onClick={() => this.deleteArticle(article._id)}><i className="fas fa-trash"></i> Delete This</a>
                      </Col>
                    </Row>
                  </ArticleItem>
                ))}
              </ArticleList>
            ) : (
              <Row>
                <Col className="col-md-12">
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
        <div className="action-div">
          <Link to="/">
            <FormBtn className="btn btn-action btn-view-search btn-lg animated infinite pulse"><i className="fas fa-search fa-3x"></i></FormBtn>
          </Link>
        </div>
      </Container>
    );
  }
}

export default Saved;
