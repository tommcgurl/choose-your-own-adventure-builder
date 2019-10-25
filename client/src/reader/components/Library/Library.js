import React from 'react';
import { connect } from 'react-redux';
import { librarySelector } from '../../store/selectors';
import AdventureList from '../AdventureList';
import Nav from '../Nav';

const Library = ({ adventures }) => {
  return (
    <React.Fragment>
      <Nav />
      {adventures.length === 0 ? (
        <p>You currently have no adventures in your library.</p>
      ) : (
        <AdventureList
          adventures={adventures.map(adventure => ({
            ...adventure,
            inLibrary: true,
          }))}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    adventures: librarySelector(state),
  };
};

export default connect(mapStateToProps)(Library);
