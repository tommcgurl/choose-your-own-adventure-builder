import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
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
      <nav>
        <Link to={routes.ROOT}>BROWSE </Link>
        <Link to={routes.ROOT + routes.READ}>READ </Link>
        {isAuthenticated(token) ? (
          <>
            <Link to={routes.ROOT + routes.LIBRARY}>LIBRARY </Link>
            <button onClick={logOut}>Log Out</button>
          </>
        ) : (
          <>
            <a href={`${API_URL}/auth/reader/google`}>
              {'Log in with Google '}
            </a>
            <a href={`${API_URL}/auth/reader/facebook`}>
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
