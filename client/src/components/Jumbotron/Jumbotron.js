import React from 'react';

const Jumbotron = ({ children }) => (
  <div style={{ marginBottom: '15px'}} className="jumbotron bg-dark text-white">
    {children}
  </div>
);

export default Jumbotron;
