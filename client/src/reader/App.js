import React from 'react';
import { connect } from 'react-redux';
import { Link as NavLink, Route, Switch } from 'react-router-dom';
import { logOut } from '../shared/actions/authActions';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { API_URL } from '../shared/constants';
import { NOT_FOUND } from '../shared/constants/routes';
import { isAuthenticated } from '../shared/services/authService';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import Library from './components/Library';
import * as routes from './constants/routes';

const ReaderApp = ({ token, logOut }) => {
  function renderStory({ title, intro, items, mainStory }) {
    return (
      <AdventureManager
        intro={intro}
        title={title}
        items={items}
        mainStory={mainStory}
      />
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navheader}>
        <NavLink
          exact
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
          to={routes.ROOT}
        >
          BROWSE{' '}
        </NavLink>
        <NavLink
          exact
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
          to={routes.ROOT + routes.READ}
        >
          READ{' '}
        </NavLink>
        {isAuthenticated(token) ? (
          <>
            <NavLink
              exact
              className={styles.linkButton}
              activeClassName={styles.linkButtonSelected}
              to={routes.ROOT + routes.LIBRARY}
            >
              LIBRARY{' '}
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
              {'Log in with Google '}
            </a>
            <a
              className={styles.fakeButton}
              href={`${API_URL}/auth/reader/facebook`}
            >
              {'Log in with Facebook '}
            </a>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path={routes.ROOT} component={AdventureBrowser} />
        <AuthRoute
          path={routes.ROOT + routes.LIBRARY}
          loginPath={routes.ROOT}
          component={Library}
        />
        <Route
          path={routes.ROOT + routes.READ}
          component={props => (
            <AdventureProvider {...props}>{renderStory}</AdventureProvider>
          )}
        />
        <Route
          path={routes.ROOT + routes.AUTH_REDIRECT}
          render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
        />
        <Route path={routes.ROOT + NOT_FOUND} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
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
)(ReaderApp);
