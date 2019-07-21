import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { API_URL } from '../shared/constants';
import authService from '../shared/services/authService';
import { logOut } from '../shared/store/actions/authActions';
import { tokenSelector } from '../shared/store/selectors';
import Draft from './components/Draft';
import Drafts from './components/Drafts';
import Editor from './components/Editor';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import PublishedAdventures from './components/PublishedAdventures';
import * as routes from './constants/routes';
import styles from './EditorApp.module.css';
import { fetchAdventuresAuthoredByUser } from './store/actions/draftActions';
import { fetchGenres } from './store/actions/listActions';

const EditorApp = ({ token, logOut, loadDrafts, loadGenres }) => {
  useEffect(() => {
    loadDrafts();
    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.navheader}>
        <nav>
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

              <button onClick={logOut}>Log Out</button>
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
      <div className={styles.content}>
        <Switch>
          <Route exact path={routes.ROOT} component={Home} />
          <AuthRoute
            exact
            path={routes.NEW_ADVENTURE}
            loginPath={routes.ROOT}
            component={NewAdventure}
          />
          <AuthRoute
            exact
            path={routes.EDIT}
            loginPath={routes.ROOT}
            component={Editor}
          />
          <AuthRoute
            exact
            path={routes.DRAFT}
            loginPath={routes.ROOT}
            component={Draft}
          />
          <AuthRoute
            exact
            path={routes.DRAFTS}
            loginPath={routes.ROOT}
            component={Drafts}
          />
          <AuthRoute
            exact
            path={routes.PUBLISHED}
            loginPath={routes.ROOT}
            component={PublishedAdventures}
          />
          <Route
            exact
            path={routes.AUTH_REDIRECT}
            render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
          />
          <Route path={routes.NOT_FOUND} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
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
    loadDrafts: () => {
      dispatch(fetchAdventuresAuthoredByUser());
    },
    loadGenres: () => {
      dispatch(fetchGenres());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorApp);
