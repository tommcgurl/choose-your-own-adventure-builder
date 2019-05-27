import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { logOut } from '../../../shared/actions/authActions';
import AuthRedirect from '../../../shared/components/AuthRedirect';
import NotFound from '../../../shared/components/NotFound';
import { API_URL } from '../../../shared/constants';
import { NOT_FOUND } from '../../../shared/constants/routes';
import { isAuthenticated } from '../../../shared/services/authService';
import * as routes from '../../constants/routes';
import Draft from '../Draft';
import Drafts from '../Drafts';
import Editor from '../Editor';
import Home from '../Home';
import NewAdventure from '../NewAdventure';
import styles from './EditorApp.module.css';

const EditorApp = ({ token }) => {
  return (
    <div className={styles.container}>
      <nav>
        <Link to={routes.ROOT}>Home</Link>
        <Link to={routes.ROOT + routes.DRAFTS}>Drafts</Link>
        <Link to={routes.ROOT + routes.NEW_ADVENTURE}>
          Create a New Adventure
        </Link>
        {isAuthenticated(token) ? (
          <button onClick={logOut}>Log Out</button>
        ) : (
          <>
            <a href={`${API_URL}/auth/editor/google`}>
              {'Log in with Google '}
            </a>
            <a href={`${API_URL}/auth/editor/facebook`}>
              {'Log in with Facebook '}
            </a>
          </>
        )}
      </nav>
      <div className={styles.content}>
        <Switch>
          <Route exact path={routes.ROOT} component={Home} />
          <Route
            path={routes.ROOT + routes.NEW_ADVENTURE}
            component={NewAdventure}
          />
          <Route path={routes.ROOT + routes.DRAFT} component={Draft} />
          <Route path={routes.ROOT + routes.DRAFTS} component={Drafts} />
          <Route path={routes.ROOT + routes.EDIT} component={Editor} />
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
