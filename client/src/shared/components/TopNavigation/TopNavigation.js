import PropTypes from 'prop-types';
import React from 'react';
import { IoMdMenu } from 'react-icons/io';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../shared/constants';
import { logOut } from '../../../shared/store/actions/authActions';
import Box from '../Box/Box';
import Button, { VARIANTS as BUTTON_VARIANT } from '../Button/Button';
import Inline from '../Inline/Inline';
import personSVG from './person.svg';
import styles from './TopNavigation.module.css';

export const TopNavigation = ({ isAuthenticated, logOut, navItems, app }) => {
  const navLinks = navItems.map(({ label, route }) => (
    <NavLink
      key={route}
      exact
      to={route}
      className={styles.linkButton}
      activeClassName={styles.linkButtonSelected}
    >
      {label}
    </NavLink>
  ));

  return (
    <header id="top-navigation" className={styles.container}>
      <Box className={styles.mobileMenu}>
        <Inline align="right">
          <Button variant={BUTTON_VARIANT.ICON}>
            <IoMdMenu style={{ width: '100%', height: '100%' }} />
          </Button>
        </Inline>
      </Box>
      <nav className={styles.nav}>
        {navLinks}
        {isAuthenticated ? (
          <button className={styles.userButton} onClick={logOut}>
            <img
              className={styles.userButtonImage}
              src={personSVG}
              alt="user"
            />
          </button>
        ) : (
          <React.Fragment>
            <a
              id="login-with-google"
              href={`${API_URL}/auth/${app}/google`}
              className={styles.linkButton}
            >
              Log in with Google
            </a>
            <a
              id="login-with-facebook"
              href={`${API_URL}/auth/${app}/facebook`}
              className={styles.linkButton}
            >
              Log in with Facebook
            </a>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

TopNavigation.propTypes = {
  /**
   * An array of nav items.
   */
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      route: PropTypes.string,
    })
  ),
  /**
   * A function used to logout a user.
   */
  logOut: PropTypes.func,
  /**
   * Whether or not the user is logged in.
   */
  isAuthenticated: PropTypes.bool,
  /**
   * 'Reader' or 'Editor' (determines auth redirects)
   */
  app: PropTypes.oneOf(['reader', 'editor']).isRequired,
};

export default connect(
  null,
  { logOut }
)(TopNavigation);
