import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import * as routes from '../../constants/routes';
import { isAuthenticated } from '../../../shared/services/authService';
import { API_URL } from '../../../shared/constants';
import { tokenSelector } from '../../../shared/store/selectors';
import { logOut } from '../../../shared/store/actions/authActions';

const Nav = ({ token, logOut }) => {
  return (
    <nav className={styles.navheader}>
      <NavLink
        exact
        to={routes.ROOT}
        className={styles.linkButton}
        activeClassName={styles.linkButtonSelected}
      >
        Browse
      </NavLink>
      {isAuthenticated(token) ? (
        <>
          <NavLink
            exact
            to={routes.LIBRARY}
            className={styles.linkButton}
            activeClassName={styles.linkButtonSelected}
          >
            Library
          </NavLink>
          <button className={styles.fakeButton} onClick={logOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <a
            className={styles.fakeButton}
            href={`${API_URL}/auth/reader/google`}
          >
            Log in with Google
          </a>
          <a
            className={styles.fakeButton}
            href={`${API_URL}/auth/reader/facebook`}
          >
            Log in with Facebook
          </a>
        </>
      )}
    </nav>
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
