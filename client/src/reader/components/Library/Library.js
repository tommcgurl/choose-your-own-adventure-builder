import React from 'react';
import { connect } from 'react-redux';
import AdventureList from '../AdventureList';

const Library = ({ adventures }) => {
  return (
    <AdventureList
      adventures={adventures.map(adventure => ({
        ...adventure,
        inLibrary: true,
      }))}
    />
  );
};

const mapStateToProps = state => {
  return {
    adventures: state.reader.library,
  };
};

export default connect(mapStateToProps)(Library);
