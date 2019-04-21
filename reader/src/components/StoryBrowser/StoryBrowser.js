import React from 'react';
import { connect } from 'react-redux';
import { getVisibleStories } from '../../selectors';

import StoryList from '../StoryList';

const StoryBrowser = ({ stories }) => {
  return <StoryList stories={stories} />;
};

const mapStateToProps = state => {
  return {
    stories: getVisibleStories(state),
  };
};

export default connect(mapStateToProps)(StoryBrowser);
