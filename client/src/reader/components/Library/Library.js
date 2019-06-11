import React from 'react';
import { connect } from 'react-redux';
import { librarySelector } from '../../store/selectors';
import AdventureList from '../AdventureList';

const Library = ({ adventures }) => {
  return <AdventureList adventures={adventures} />;
};

const mapStateToProps = state => {
  return {
    adventures: librarySelector(state),
  };
};

export default connect(mapStateToProps)(Library);
