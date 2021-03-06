import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <Container>
    <Row>
      <Col className="col-md-12">
        <div className="alert alert-danger border-danger">
          <img src="https://media.giphy.com/media/5f2mqsGTHpe5a/giphy.gif" alt="404 Error" className="img-404 img-fluid" />
          <p>It looks like the thing you're trying to access doesn't exist.  Since this app has only two "pages," it would be super easy for me to lead you to them.  So, I'll do just that!</p>
          <p>Check out the following links.  I swear they will take you somewhere other than this page!</p>
          <ul className="pages-list">
            <li><Link to="/">Search Page</Link></li>
            <li><Link to="/saved">Saved Articles Page</Link></li>
          </ul>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
