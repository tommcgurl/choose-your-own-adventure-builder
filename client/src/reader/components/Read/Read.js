import React from 'react';
import { connect } from 'react-redux';
import { adventureSelector } from '../../store/selectors';

const Read = ({ adventure }) => {
  return adventure ? <div>Yes</div> : <div>No</div>;
};

const mapStateToProps = (state, { match }) => {
  return {
    adventure:
      match &&
      match.params &&
      match.params.adventureId &&
      adventureSelector(state)(match.params.adventureId),
  };
};

export default connect(mapStateToProps)(Read);
