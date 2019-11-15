import React from 'react';
import { connect } from 'react-redux';
import TopNavigation from '../../../shared/components/TopNavigation';
import { isAuthenticated } from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors';
import * as routes from '../../constants/routes';

const Nav = ({ token }) => {
  const defaultNavItems = [
    {
      label: 'Browse',
      route: routes.ROOT,
    },
    {
      label: 'FAQ',
      route: routes.FAQ,
    },
  ];
  const authenticated = isAuthenticated(token);
  const authenticatedNavItems = authenticated
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
      isAuthenticated={authenticated}
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
