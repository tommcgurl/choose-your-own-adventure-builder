import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import authService from '../services/authService';
import * as routes from '../constants/routes';
import { authenticated } from '../store/actions/authActions';
import queryString from 'query-string';

const AuthRedirect = ({ rootPath, location, setAuthToken }) => {
  const queryStrings = queryString.parse(location.search);
  if (queryStrings.userToken) {
    const decodedToken = authService.decodeToken(queryStrings.userToken);
    if (decodedToken && decodedToken.username) {
      setAuthToken(queryStrings.userToken);
      return <Redirect to={rootPath} />;
    }

    return <Redirect to={rootPath + routes.NOT_FOUND} />;
  }

  if (queryStrings.providerToken) {
    const decodedToken = authService.decodeToken(queryStrings.providerToken);
    if (decodedToken && decodedToken.provider && decodedToken.providerId) {
      return (
        <Redirect
          to={{
            pathname: rootPath + routes.CREATE_USERNAME,
            state: { providerToken: queryStrings.providerToken },
          }}
        />
      );
    }

    return <Redirect to={rootPath + routes.NOT_FOUND} />;
  }

  return <Redirect to={rootPath + routes.NOT_FOUND} />;
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
