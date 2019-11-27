import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoLogoFacebook, IoLogoGoogle, IoMdMenu } from 'react-icons/io';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../shared/constants';
import { logOut } from '../../../shared/store/actions/authActions';
import { getUsername, getUserPhoto } from '../../services/authService';
import { tokenSelector } from '../../store/selectors';
import Box from '../Box/Box';
import Button, { VARIANTS as BUTTON_VARIANT } from '../Button/Button';
import Inline from '../Inline/Inline';
import Menu from '../Menu/Menu';
import Stack from '../Stack/Stack';
import UserLink from '../UserLink/UserLink';
import personSVG from './person.svg';
import styles from './TopNavigation.module.css';

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
    setMobileMenuIsOpen(false);
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
      <Nav
        app={app}
        mobileMenuIsOpen={mobileMenuIsOpen}
        isAuthenticated={isAuthenticated}
        userPhoto={getUserPhoto(token)}
        username={getUsername(token)}
        logOut={logOut}
      >
        {navLinks}
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

const Nav = ({
  children,
  mobileMenuIsOpen,
  isAuthenticated,
  userPhoto,
  app,
  username,
  logOut,
}) => {
  return (
    <nav>
      {mobileMenuIsOpen && (
        <Box
          component="nav"
          className={classNames(styles.mobileNav, styles.shadow)}
        >
          <Stack align="right">
            {children}
            {isAuthenticated && (
              <UserLink
                username={username || 'Profile'}
                className={styles.linkButton}
                app={app}
              />
            )}
            {isAuthenticated && (
              <a onClick={logOut} href="#" className={styles.linkButton}>
                Logout
              </a>
            )}
          </Stack>
        </Box>
      )}
      <Box component="nav" className={styles.nav}>
        <Inline align="right">
          {children}
          {isAuthenticated ? (
            <Menu
              button={props => (
                <button className={styles.userButton} {...props}>
                  <img
                    className={
                      userPhoto
                        ? styles.userButtonPhoto
                        : styles.userButtonImage
                    }
                    src={userPhoto || personSVG}
                    alt="user"
                  />
                </button>
              )}
              align="right"
            >
              <UserLink
                username={username || 'Profile'}
                className={styles.linkButton}
                app={app}
              />
              <a onClick={logOut} href="#" className={styles.linkButton}>
                Logout
              </a>
            </Menu>
          ) : (
            <Inline>
              <a
                id="login-with-google"
                href={`${API_URL}/auth/${app}/google`}
                className={styles.linkButton}
                title="Login with Google"
              >
                <IoLogoGoogle style={{ height: '20px', width: '20px' }} />
              </a>
              <a
                id="login-with-facebook"
                href={`${API_URL}/auth/${app}/facebook`}
                className={styles.linkButton}
                title="Login with Facebook"
              >
                <IoLogoFacebook style={{ height: '20px', width: '20px' }} />
              </a>
            </Inline>
          )}
        </Inline>
      </Box>
    </nav>
  );
};

export default connect(
  state => ({
    token: tokenSelector(state),
  }),
  { logOut }
)(TopNavigation);
