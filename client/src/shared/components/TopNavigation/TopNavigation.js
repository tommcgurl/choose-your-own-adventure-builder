import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink, Route, Switch } from 'react-router-dom';

import { logOut } from '../../../shared/store/actions/authActions';
import { API_URL } from '../../../shared/constants';

import * as routes from '../../constants/routes';
import styles from './TopNavigation.module.css';
import personSVG from './person.svg';


export const TopNavigation = ({ isAuthenticated, logOut, navItems }) => {
  const allNavItems = !isAuthenticated ? [
    ...navItems,
    {
      label: 'Log in with Google',
      route: `${API_URL}/auth/editor/google`,
    },
    {
      label: 'Log in with Facebook',
      route: `${API_URL}/auth/editor/facebook`,
    }
  ] : navItems;
  const navLinks = allNavItems.map(({ label, route }) => (
    <NavLink
      exact
      to={route}
      className={styles.linkButton}
      activeClassName={styles.linkButtonSelected}
    >
      {label}
    </NavLink>
  ));

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        {navLinks}
        {isAuthenticated &&
          <button
            className={styles.userButton}
            onClick={logOut}>
            <img
              className={styles.userButtonImage}
              src={personSVG} />
          </button>
        }
      </nav>
    </header>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

TopNavigation.propTypes = {
  /**
   * An array of nav items.
   */
  navItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
  })),
  /**
   * A function used to logout a user.
   */
  logOut: PropTypes.func,
  /**
   * Whether or not the user is logged in.
   */
  isAuthenticated: PropTypes.bool,
}

export default connect(
  null,
  mapDispatchToProps,
)(TopNavigation)


