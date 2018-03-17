import React, { Component } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { ArticleList, ArticleItem } from '../components/Article';
import { Input, FormBtn, YearSelect } from '../components/Form';

class Search extends Component {
  state = {
    articles: [],
    topic: '',
    startDate: new Date().getFullYear(),
    endDate: new Date().getFullYear()
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var query = {
      topic: this.state.topic,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    API.searchArticles(this.state.topic, this.state.startDate, this.state.endDate)
      .then(res => {
        this.setState({ articles: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="col-md-12">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header text-center bg-dark">
                <h4>Search</h4>
              </div>
              <div className="card-body">
                <form>
                  <label>Topic</label>
                  <Input value={this.state.topic}
                    onChange={this.handleInputChange}
                    name="topic"
                    placeholder="Topic (Required)"
                  />
                  <Row>
                    <Col className="col-md-6">
                      <label>Start Year</label>
                      <YearSelect 
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                        name="startDate"
                      />
                    </Col>
                    <Col className="col-md-6">
                      <label>End Year</label>
                      <YearSelect 
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                        name="endDate"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-12 text-center">
                      <FormBtn disabled={!this.state.topic}
                        onClick={this.handleFormSubmit}
                        className="btn btn-dark btn-lg">
                        Submit
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
                {this.state.articles.map(article => (
                  <ArticleItem key={article._id}>
                    <h3>{article.headline.main}</h3>
                    <p>{article.byline.original} (published {article.pub_date})</p>
                    <p>{article.snippet}</p>
                    <FormBtn className="btn btn-default" onClick={() => this.saveArticle(article.title)}>Save</FormBtn>
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

export default Search;
