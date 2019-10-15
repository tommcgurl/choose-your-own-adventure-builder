import React from 'react';
import Nav from '../Nav';

const BrowsingLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Nav />
      {children}
    </React.Fragment>
  );
};

export default BrowsingLayout;
