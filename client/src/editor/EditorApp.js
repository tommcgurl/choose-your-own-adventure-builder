import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import Draft from './components/Draft';
import Drafts from './components/Drafts';
import Editor from './components/Editor';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import PublishedAdventures from './components/PublishedAdventures';
import { API_URL } from '../shared/constants';
import * as routes from './constants/routes';
import styles from './EditorApp.module.css';
import { fetchDrafts } from './store/actions/draftActions';
import CreateUsername from '../shared/components/CreateUsername';
import authService from '../shared/services/authService';
import TopNavigation from '../shared/components/TopNavigation';
import { tokenSelector } from '../shared/store/selectors';

const EditorApp = ({ token, loadDrafts, loadGenres }) => {

  useEffect(() => {
    loadDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultNavItems = [
    {
      label: 'Home',
      route: routes.ROOT,
    },
    {
      label: 'Create a New Adventure',
      route: routes.DRAFTS,
    },
  ];

  const isAuthenticated = authService.isAuthenticated(token)
  const authenticatedNavItems = isAuthenticated ? [
    {
      label: 'Drafts',
      route: routes.DRAFTS,
    },
    {
      label: 'Published Adventures',
      route: routes.PUBLISHED,
    },
  ] : [];
  const navItems = [
    ...defaultNavItems,
    ...authenticatedNavItems,
  ]
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TopNavigation
          isAuthenticated={isAuthenticated}
          navItems={navItems}
        />
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
          <Route
            path={routes.CREATE_USERNAME}
            render={props => (
              <CreateUsername rootPath={routes.ROOT} {...props} />
            )}
          />
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
    loadDrafts: () => {
      dispatch(fetchDrafts());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorApp);
