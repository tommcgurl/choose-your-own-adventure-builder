import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoLogoFacebook, IoLogoGoogle, IoMdMenu } from 'react-icons/io';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../shared/constants';
import { logOut } from '../../../shared/store/actions/authActions';
import { getUserPhoto } from '../../services/authService';
import { tokenSelector } from '../../store/selectors';
import Box from '../Box/Box';
import Button, { VARIANTS as BUTTON_VARIANT } from '../Button/Button';
import Inline from '../Inline/Inline';
import Stack from '../Stack/Stack';
import personSVG from './person.svg';
import styles from './TopNavigation.module.css';

const Nav = ({ children, mobileMenuIsOpen }) => {
  return (
    <React.Fragment>
      {mobileMenuIsOpen && (
        <Box
          component="nav"
          className={classNames(styles.mobileNav, styles.shadow)}
        >
          <Stack align="right">{children}</Stack>
        </Box>
      )}
      <Box component="nav" className={styles.nav}>
        <Inline align="right">{children}</Inline>
      </Box>
    </React.Fragment>
  );
};

export const TopNavigation = ({
  isAuthenticated,
  logOut,
  navItems,
  app,
  token,
}) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const navLinks = navItems.map(({ label, route }) => (
    <NavLink
      key={route}
      exact
      to={route}
      className={styles.linkButton}
      activeClassName={styles.linkButtonSelected}
      onClick={handleMobileMenuButtonClick}
    >
      {label}
    </NavLink>
  ));

  function handleMobileMenuClick() {
    setMobileMenuIsOpen(state => !state);
  }

  function handleMobileMenuButtonClick() {
    setMobileMenuIsOpen(state => false);
  }

  return (
    <header id="top-navigation" className={styles.container}>
      <Box className={classNames(styles.mobileMenu, styles.shadow)}>
        <Inline align="right">
          <Button variant={BUTTON_VARIANT.ICON} onClick={handleMobileMenuClick}>
            <IoMdMenu style={{ width: '100%', height: '100%' }} />
          </Button>
        </Inline>
      </Box>
      <Nav mobileMenuIsOpen={mobileMenuIsOpen}>
        {navLinks}
        {isAuthenticated ? (
          <Inline align="right">
            {getUserPhoto(token) ? (
              <img
                onClick={logOut}
                className={styles.userButton}
                src={getUserPhoto(token)}
                alt="user"
              />
            ) : (
              <button className={styles.userButton} onClick={logOut}>
                <img
                  className={styles.userButtonImage}
                  src={personSVG}
                  alt="user"
                />
              </button>
            )}
          </Inline>
        ) : (
          <Inline>
            <a
              id="login-with-google"
              href={`${API_URL}/auth/${app}/google`}
              className={styles.linkButton}
              title="Login with Google"
            >
              <IoLogoGoogle style={{ height: '16px', width: '16px' }} />
            </a>
            <a
              id="login-with-facebook"
              href={`${API_URL}/auth/${app}/facebook`}
              className={styles.linkButton}
              title="Login with Facebook"
            >
              <IoLogoFacebook style={{ height: '16px', width: '16px' }} />
            </a>
          </Inline>
        )}
      </Nav>
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
  state => ({
    token: tokenSelector(state),
  }),
  { logOut }
)(TopNavigation);
