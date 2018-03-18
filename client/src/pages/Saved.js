import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { ArticleList, ArticleItem } from '../components/Article';
import { FormBtn } from '../components/Form';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import API from '../utils/api';
import moment from 'moment';

class Saved extends Component {
  state = {
    articles: []
  };

  loadArticles = () => {
    API.getSavedArticles()
      .then(savedArticles => {
        this.setState({articles: savedArticles.data});
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
            <Jumbotron>
              <h1><em>New York Times</em> Article Scrubber<br /><small>&mdash; Saved Articles &mdash;</small></h1>
              <p className="lead text-center">These are all the articles that have been saved. Feel free to delete whatever you want if you're done reading or if you just can't stand the article anymore; it won't offend anyone.</p>
              <p className="text-center">(Pro-tip: to get back to the search page, click the button in the lower-right corner!)</p>
            </Jumbotron>
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map((article, index) => (
                  <ArticleItem key={`article-${article._id}`}>
                    <h3><a href={article.web_url} target="_blank">{article.headline}</a></h3>
                    <p>{article.byline} <em>(published {moment(article.datePublished).format('M/D/YYYY @ h:mmA')})</em></p>
                    <p>{article.snippet}</p>
                    <div className="d-flex w-100 justify-content-between">
                      <a href={article.url} className="full-article-link" target="_blank"><i className="fas fa-external-link-alt"></i> Read Full Article</a>
                      <a key={`delete-${index + 1}`} className="delete-article-link" onClick={() => this.deleteArticle(article._id)}><i className="fas fa-trash"></i> Delete This</a>
                    </div>
                  </ArticleItem>
                ))}
              </ArticleList>
            ) : (
              <Row>
                <Col className="col-md-12">
                  <div className="card text-white bg-danger mb-3">
                    <div className="card-body text-center">
                      <i className="far fa-frown fa-4x no-results-icon"></i>
                      <h5 className="card-text">There are currently no saved articles.</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <div className="action-div">
          <Link to="/">
            <FormBtn className="btn btn-action btn-view-search btn-lg animated infinite pulse"><i className="fas fa-search fa-2x"></i></FormBtn>
          </Link>
        </div>
      </Container>
    );
  }
}

export default Saved;
