import React from 'react';
import { connect } from 'react-redux';
import authService from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors';
import * as routes from '../../constants/routes';
import TopNavigation from '../../../shared/components/TopNavigation';

const Nav = ({ token }) => {
  const defaultNavItems = [
    {
      label: 'Browse',
      route: routes.ROOT,
    },
  ];
  const isAuthenticated = authService.isAuthenticated(token);
  const authenticatedNavItems = isAuthenticated
    ? [
        {
          label: 'Library',
          route: routes.LIBRARY,
        },
      ]
    : [];
  const navItems = [...defaultNavItems, ...authenticatedNavItems];
  return (
    <TopNavigation
      navItems={navItems}
      isAuthenticated={isAuthenticated}
      app="reader"
    />
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
  };
};

export default connect(mapStateToProps)(Nav);
