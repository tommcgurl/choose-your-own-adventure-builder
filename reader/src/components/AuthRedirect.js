import jwtDecode from 'jwt-decode';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticated } from '../actions/authActions';
import * as routes from '../constants/routes';

const AuthRedirect = ({ match, setAuthToken }) => {
  let token;
  try {
    token = jwtDecode(match.params.token);
    setAuthToken(match.params.token);
  } catch (err) {
    return <Redirect to={routes.NOT_FOUND} />;
  }
  return (
    <div>
      Hello from AuthRedirect. <pre>{JSON.stringify(token, null, 2)}</pre>
    </div>
  );
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
  mapDispatchToProps,
)(AuthRedirect);
