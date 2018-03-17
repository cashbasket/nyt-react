import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
    <div className="container">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="/">NYT Article Scrubber</a>
      <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/saved">View Saved Articles</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;
