import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdventures } from '../../actions/adventureActions';
import { getVisibleAdventures } from '../../selectors';
import AdventureList from '../AdventureList';

const AdventureBrowser = ({ adventures, loadAdventures }) => {
  useEffect(() => {
    loadAdventures();
  }, []);
  return <AdventureList adventures={adventures} />;
};

const mapStateToProps = state => {
  return {
    adventures: getVisibleAdventures(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAdventures: () => {
      dispatch(fetchAdventures());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdventureBrowser);
