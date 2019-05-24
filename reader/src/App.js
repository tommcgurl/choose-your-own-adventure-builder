import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { logOut } from './actions/authActions';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import AuthRedirect from './components/AuthRedirect';
import Library from './components/Library';
import { API_URL } from './constants';
import * as routes from './constants/routes';
import { isAuthenticated } from './services/authService';

const App = ({ token, logOut }) => {
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

  function NotFound(props) {
    return <div>404, bud.</div>;
  }

  return (
    <Router>
      <div className={styles.container}>
        <nav>
          <Link to={routes.LIBRARY}>LIBRARY </Link>
          <Link to={routes.ROOT}>BROWSE </Link>
          <Link to={routes.READ}>READ </Link>
          {isAuthenticated(token) ? (
            <button onClick={logOut}>Log Out</button>
          ) : (
            <>
              <a href={`${API_URL}/auth/reader/google`}>Log in with Google </a>
              <a href={`${API_URL}/auth/reader/facebook`}>
                Log in with Facebook{' '}
              </a>
            </>
          )}
        </nav>
        <Switch>
          <Route exact path={routes.ROOT} component={AdventureBrowser} />
          <Route path={routes.LIBRARY} component={Library} />
          <Route
            path={routes.READ}
            component={props => (
              <AdventureProvider {...props}>{renderStory}</AdventureProvider>
            )}
          />
          <Route path={routes.AUTH_REDIRECT} component={AuthRedirect} />
          <Route path={routes.NOT_FOUND} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
