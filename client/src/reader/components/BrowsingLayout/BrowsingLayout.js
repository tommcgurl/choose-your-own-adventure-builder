import React from 'react';
import Nav from '../Nav';

const BrowsingLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default BrowsingLayout;
