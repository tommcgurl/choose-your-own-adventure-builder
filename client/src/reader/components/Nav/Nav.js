import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../shared/constants';
import authService from '../../../shared/services/authService';
import { logOut } from '../../../shared/store/actions/authActions';
import { tokenSelector } from '../../../shared/store/selectors';
import * as routes from '../../constants/routes';
import TopNavigation from '../../../shared/components/TopNavigation';
import styles from './Nav.module.css';

const Nav = ({ token, logOut }) => {
  const defaultNavItems = [
    {
      label: 'Browse',
      route: routes.ROOT,
    }
  ]
  const isAuthenticated = authService.isAuthenticated(token)
  const authenticatedNavItems = isAuthenticated ? [
    {
      label: 'Library',
      route: routes.LIBRARY
    },
  ] : [];
  const navItems = [
    ...defaultNavItems,
    ...authenticatedNavItems,
  ];
  return (
    <TopNavigation
      navItems={navItems}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
