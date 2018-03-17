import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { ArticleList, ArticleItem } from '../components/Article';
import { FormBtn } from '../components/Form';
import API from '../utils/api';

class Saved extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map(article => (
                  <ArticleItem key={article._id}>
                    <strong>
                      {article.title} by {article.author}
                    </strong>
                    <FormBtn onClick={() => this.deleteArticle(article._id)} />
                  </ArticleItem>
                ))}
              </ArticleList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
