import React from 'react';
import { connect } from 'react-redux';
import { getLibrary } from '../../selectors';

import StoryList from '../StoryList';

const Library = ({ stories }) => {
  return <StoryList stories={stories} />;
};

const mapStateToProps = state => {
  return {
    stories: getLibrary(state),
  };
};

export default connect(mapStateToProps)(Library);
