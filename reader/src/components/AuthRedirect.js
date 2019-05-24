import jwtDecode from 'jwt-decode';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticated } from '../actions/authActions';
import * as routes from '../constants/routes';

const AuthRedirect = ({ match, setAuthToken }) => {
  try {
    jwtDecode(match.params.token);
  } catch (err) {
    return <Redirect to={routes.NOT_FOUND} />;
  }
  setAuthToken(match.params.token);
  return <Redirect to={routes.ROOT} />;
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthToken: token => {
      dispatch(authenticated(token));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthRedirect);
