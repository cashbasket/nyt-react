import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Saved from './pages/Saved';
import NoMatch from './pages/NoMatch';
import Jumbotron from './components/Jumbotron';
import { Col, Row, Container } from './components/Grid';

const App = () => (
  <div>
    <Jumbotron>
      <Container>
        <Row>
          <Col className="col-md-12">
            <h1>NEW YORK TIMES <small>Article Scrubber</small></h1>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </div>
);

export default App;
