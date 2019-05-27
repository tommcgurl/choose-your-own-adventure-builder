import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { logOut } from '../../../shared/actions/authActions';
import AuthRedirect from '../../../shared/components/AuthRedirect';
import NotFound from '../../../shared/components/NotFound';
import { API_URL } from '../../../shared/constants';
import { isAuthenticated } from '../../../shared/services/authService';
import * as routes from '../../constants/routes';
import AdventureBrowser from '../AdventureBrowser';
import AdventureManager from '../AdventureManager';
import AdventureProvider from '../AdventureProvider';
import Library from '../Library';
import styles from './ReaderApp.module.css';

const ReaderApp = ({ token }) => {
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
        <Link to={routes.ROOT + routes.LIBRARY}>LIBRARY </Link>
        <Link to={routes.ROOT + routes.READ}>READ </Link>
        {isAuthenticated(token) ? (
          <button onClick={logOut}>Log Out</button>
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
        <Route
          exact
          path={routes.ROOT + routes.ROOT}
          component={AdventureBrowser}
        />
        <Route path={routes.ROOT + routes.LIBRARY} component={Library} />
        <Route
          path={routes.ROOT + routes.READ}
          component={props => (
            <AdventureProvider {...props}>{renderStory}</AdventureProvider>
          )}
        />
        <Route
          path={routes.ROOT + routes.AUTH_REDIRECT}
          component={AuthRedirect}
        />
        <Route path={routes.ROOT + routes.NOT_FOUND} component={NotFound} />
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
