import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink, Route, Switch } from 'react-router-dom';

import { logOut } from '../../../shared/store/actions/authActions';
import { API_URL } from '../../../shared/constants';
import { tokenSelector } from '../../../shared/store/selectors';

import authService from '../../../shared/services/authService';
import * as routes from '../../constants/routes';
import styles from './TopNavigation.module.css';
import personSVG from './person.svg';

const TopNavigation = ({ token, logOut }) => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <NavLink
          exact
          to={routes.ROOT}
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
        >
          Home
          </NavLink>

        <NavLink
          exact
          to={routes.NEW_ADVENTURE}
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
        >
          Create a New Adventure
          </NavLink>
        {authService.isAuthenticated(token) ? (
          <React.Fragment>
            <NavLink
              exact
              to={routes.DRAFTS}
              className={styles.linkButton}
              activeClassName={styles.linkButtonSelected}
            >
              Drafts
              </NavLink>
            <NavLink
              exact
              to={routes.PUBLISHED}
              className={styles.linkButton}
              activeClassName={styles.linkButtonSelected}
            >
              Published Adventures
              </NavLink>

            <button
              className={styles.userButton}
              onClick={logOut}>
              <img
                className={styles.userButtonImage}
                src={personSVG} />
            </button>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <a
                className={styles.fakeButton}
                href={`${API_URL}/auth/editor/google`}
              >
                {'Log in with Google '}
              </a>
              <a
                className={styles.fakeButton}
                href={`${API_URL}/auth/editor/facebook`}
              >
                {'Log in with Facebook '}
              </a>
            </React.Fragment>
          )}
      </nav>
    </header>
  )
}

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
)(TopNavigation)