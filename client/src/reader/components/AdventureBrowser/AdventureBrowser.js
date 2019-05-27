import React from 'react';
import { connect } from 'react-redux';
import { getVisibleAdventures } from '../../selectors';

import AdventureList from '../AdventureList';

const AdventureBrowser = ({ adventures }) => {
  return <AdventureList adventures={adventures} />;
};

const mapStateToProps = state => {
  return {
    adventures: getVisibleAdventures(state),
  };
};

export default connect(mapStateToProps)(AdventureBrowser);
