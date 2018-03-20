import React from 'react';

export const Row = ({ fluid, id, children }) => (
  <div id={id} className={`row${fluid ? '-fluid' : ''}`}>
    {children}
  </div>
);
