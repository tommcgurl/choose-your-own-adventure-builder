import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import authService from '../services/authService';
import { authenticated } from '../store/actions/authActions';

const AuthRedirect = ({ rootPath, location, authenticated }) => {
  const queryStrings = queryString.parse(location.search);
  if (queryStrings.userToken) {
    const decodedToken = authService.decodeToken(queryStrings.userToken);
    if (decodedToken && decodedToken.username) {
      authenticated(queryStrings.userToken);
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

export default connect(
  null,
  { authenticated }
)(AuthRedirect);
