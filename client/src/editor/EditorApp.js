import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  AuthRedirect,
  AuthRoute,
  CreateUsername,
  Modal,
  NotFound,
  Toast,
  TopNavigation,
} from '../shared/components';
import { isAuthenticated } from '../shared/services/authService';
import { tokenSelector } from '../shared/store/selectors';
import Draft from './components/Draft';
import Drafts from './components/Drafts';
import Editor from './components/Editor';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import PublishedAdventure from './components/PublishedAdventure';
import PublishedAdventures from './components/PublishedAdventures';
import * as routes from './constants/routes';
import styles from './EditorApp.module.css';
import { fetchDrafts } from './store/actions/draftActions';

const EditorApp = ({ token, fetchDrafts }) => {
  useEffect(() => {
    if (isAuthenticated(token)) {
      fetchDrafts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultNavItems = [
    {
      label: 'Home',
      route: routes.ROOT,
    },
  ];

  const authenticated = isAuthenticated(token);
  const authenticatedNavItems = authenticated
    ? [
        {
          label: 'Create a New Adventure',
          route: routes.NEW_ADVENTURE,
        },
        {
          label: 'Drafts',
          route: routes.DRAFTS,
        },
        {
          label: 'Published Adventures',
          route: routes.PUBLISHED,
        },
      ]
    : [];
  const navItems = [...defaultNavItems, ...authenticatedNavItems];
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <TopNavigation
            isAuthenticated={authenticated}
            navItems={navItems}
            app="editor"
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
            <AuthRoute
              exact
              path={routes.PUBLISHED_ADVENTURE}
              loginPath={routes.ROOT}
              component={PublishedAdventure}
            />
            <Route
              exact
              path={routes.AUTH_REDIRECT}
              render={props => (
                <AuthRedirect rootPath={routes.ROOT} {...props} />
              )}
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
      <Modal />
      <Toast />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
  };
};

export default connect(
  mapStateToProps,
  { fetchDrafts }
)(EditorApp);
