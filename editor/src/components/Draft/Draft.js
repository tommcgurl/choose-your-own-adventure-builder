import React from 'react';
import { connect } from 'react-redux';
import getCurrentDraft from '../../selectors/getCurrentDraft';

const Draft = ({ draft }) => {
  return <div>{draft.title}</div>;
};

const mapStateToProps = state => {
  return {
    draft: getCurrentDraft(state),
  };
};

export default connect(mapStateToProps)(Draft);
