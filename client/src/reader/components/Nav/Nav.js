import React from 'react';
import { connect } from 'react-redux';
import TopNavigation from '../../../shared/components/TopNavigation';
import authService from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors';
import * as routes from '../../constants/routes';

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
  const faq = [
    {
      label: 'FAQ',
      route: routes.FAQ
    }
  ]
  const navItems = [...defaultNavItems, ...authenticatedNavItems, ...faq];
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
