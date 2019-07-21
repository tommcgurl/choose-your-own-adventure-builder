import React from 'react';
import { connect } from 'react-redux';
import { librarySelector } from '../../store/selectors';
import AdventureList from '../AdventureList';
import Nav from '../Nav';

const Library = ({ adventures }) => {
  return (
    <>
      <Nav />
      <AdventureList
        adventures={adventures.map(adventure => ({
          ...adventure,
          inLibrary: true,
        }))}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    adventures: librarySelector(state),
  };
};

export default connect(mapStateToProps)(Library);
