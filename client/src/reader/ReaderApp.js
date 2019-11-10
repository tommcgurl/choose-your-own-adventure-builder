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
} from '../shared/components';
import authService from '../shared/services/authService';
import { tokenSelector } from '../shared/store/selectors';
import AdventureBrowser from './components/AdventureBrowser';
import Cover from './components/Cover';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import Library from './components/Library';
import Profile from './components/Profile';
import Read from './components/Read/Read';
import * as routes from './constants/routes';
import styles from './ReaderApp.module.css';
import { getUserLibrary } from './store/actions/libraryActions';
import { fetchUserReviews } from './store/actions/reviewActions';

const ReaderApp = ({ token, getUserLibrary, fetchUserReviews }) => {
  useEffect(() => {
    if (authService.isAuthenticated(token)) {
      getUserLibrary();
      fetchUserReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Switch>
          <Route exact path={routes.ROOT} component={AdventureBrowser} />
          <Route
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
          <AuthRoute
            exact
            path={routes.LIBRARY}
            loginPath={routes.ROOT}
            component={Library}
          />
          <AuthRoute
            path={routes.READ}
            loginPath={routes.ROOT}
            component={Read}
          />
          <Route path={routes.COVER} component={Cover} />
          <Route path={routes.PROFILE} component={Profile} />
          <Route path={routes.FAQ} component={FrequentlyAskedQuestions} />
          <Route component={NotFound} />
        </Switch>
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
  {
    getUserLibrary,
    fetchUserReviews,
  }
)(ReaderApp);
