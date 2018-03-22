import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Saved from './pages/Saved';
import NoMatch from './pages/NoMatch';
import io from 'socket.io-client';
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import SiteNav from './components/SiteNav';
import './App.css';

const socketParams = { rememberTransport: false, transports: ['websocket'] };
const socket = window.location.hostname === 'localhost' ? io('http://localhost:3001', socketParams ) : io(socketParams);
let savedTimeout;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      articleSaved: ''
    };
    this.doArticleSaved = this.doArticleSaved.bind(this);
    this.send = this.send.bind(this);
  }

  doArticleSaved = (message) => {
    clearTimeout(savedTimeout);
    const articleSavedDiv = document.getElementById('articleSaved');
    articleSavedDiv.textContent = message;
    articleSavedDiv.classList.add('fade');
    savedTimeout = setTimeout(() => {
      articleSavedDiv.classList.remove('fade');
    }, 5000);
  }
  
  send = (headline) => {
    const msg = `"${headline}" was just saved!`;
    socket.emit('save', msg);
    this.doArticleSaved(msg);
  }

  render() {
    // testing for socket connections
    socket.on('save', (article) => {
      this.doArticleSaved(article);
    });

    return (
      <div>
        <Router>
          <div className="appContainer">
            <SiteNav />
            <Jumbotron fluid className="bg-danger text-white">
              <Container>
                <Row>
                  <Col className="col-md-12">
                    <h1>NEW YORK TIMES <small>Article Scrubber</small></h1>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
            <Switch>
              <PropsRoute exact path="/" component={Search} send={this.send} />
              <PropsRoute exact path="/search" component={Search} send={this.send} />
              <Route exact path="/saved" component={Saved} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
        <div id="articleSaved"></div>
      </div>
    );
  }
}

export default App;