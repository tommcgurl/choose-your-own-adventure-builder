import React from 'react';
import Nav from '../Nav';
import Options from '../Options';

const BrowsingLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <Options />
      {children}
    </div>
  );
};

export default BrowsingLayout;
