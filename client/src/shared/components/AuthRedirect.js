import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import { authenticated } from '../store/actions/authActions';

const AuthRedirect = ({ rootPath, match, setAuthToken }) => {
  try {
    jwtDecode(match.params.token);
  } catch (err) {
    return <Redirect to={rootPath + routes.NOT_FOUND} />;
  }
  setAuthToken(match.params.token);
  return <Redirect to={rootPath} />;
};

AuthRedirect.propTypes = {
  rootPath: PropTypes.string.isRequired,
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
