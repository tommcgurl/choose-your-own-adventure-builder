import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { logOut } from '../shared/actions/authActions';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { API_URL } from '../shared/constants';
import { NOT_FOUND } from '../shared/constants/routes';
import { isAuthenticated } from '../shared/services/authService';
import styles from './App.module.css';
import Draft from './components/Draft';
import Drafts from './components/Drafts';
import Editor from './components/Editor';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import * as routes from './constants/routes';

const EditorApp = ({ token, logOut }) => {
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
            to={routes.ROOT + routes.NEW_ADVENTURE}
            className={styles.linkButton}
            activeClassName={styles.linkButtonSelected}
          >
            Create a New Adventure
          </NavLink>
          {isAuthenticated(token) ? (
            <>
              <NavLink
                exact
                to={routes.ROOT + routes.DRAFTS}
                className={styles.linkButton}
                activeClassName={styles.linkButtonSelected}
              >
                Drafts
              </NavLink>
              <button onClick={logOut}>Log Out</button>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </header>
      <div className={styles.content}>
        <Switch>
          <Route exact path={routes.ROOT} component={Home} />
          <AuthRoute
            path={routes.ROOT + routes.NEW_ADVENTURE}
            loginPath={routes.ROOT}
            component={NewAdventure}
          />
          <AuthRoute
            path={routes.ROOT + routes.DRAFT}
            loginPath={routes.ROOT}
            component={Draft}
          />
          <AuthRoute
            path={routes.ROOT + routes.DRAFTS}
            loginPath={routes.ROOT}
            component={Drafts}
          />
          <AuthRoute
            path={routes.ROOT + routes.EDIT}
            loginPath={routes.ROOT}
            component={Editor}
          />
          <Route
            path={routes.ROOT + routes.AUTH_REDIRECT}
            render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
          />
          <Route path={routes.ROOT + NOT_FOUND} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
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
)(EditorApp);
