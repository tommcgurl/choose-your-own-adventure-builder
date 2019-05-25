import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { logOut } from './actions/authActions';
import styles from './App.module.css';
import AuthRedirect from './components/AuthRedirect';
import Draft from './components/Draft';
import Drafts from './components/Drafts';
import Editor from './components/Editor';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import { API_URL } from './constants';
import * as routes from './constants/routes';
import { isAuthenticated } from './services/authService';

const App = ({ token }) => {
  function NotFound(props) {
    return <div>404, bud.</div>;
  }

  return (
    <Router>
      <div className={styles.container}>
        <nav>
          <Link to={routes.ROOT}>Home</Link>
          <Link to={routes.DRAFTS}>Drafts</Link>
          <Link to={routes.NEW_ADVENTURE}>Create a New Adventure</Link>
          {isAuthenticated(token) ? (
            <button onClick={logOut}>Log Out</button>
          ) : (
            <>
              <a href={`${API_URL}/auth/editor/google`}>Log in with Google </a>
              <a href={`${API_URL}/auth/editor/facebook`}>
                Log in with Facebook{' '}
              </a>
            </>
          )}
        </nav>
        <div className={styles.content}>
          <Switch>
            <Route path={routes.NEW_ADVENTURE} component={NewAdventure} />
            <Route path={routes.DRAFT} component={Draft} />
            <Route path={routes.DRAFTS} component={Drafts} />
            <Route path={routes.EDIT} component={Editor} />
            <Route exact path={routes.ROOT} component={Home} />
            <Route path={routes.AUTH_REDIRECT} component={AuthRedirect} />
            <Route path={routes.NOT_FOUND} component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
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
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
