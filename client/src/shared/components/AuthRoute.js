import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const AuthRoute = ({ loginPath, component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated(token)) {
          return <Component {...props} />;
        }
        return <Redirect to={loginPath} />;
      }}
    />
  );
};

AuthRoute.propTypes = {
  loginPath: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(AuthRoute);
