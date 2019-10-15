import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  AuthRedirect,
  AuthRoute,
  CreateUsername,
  Modal,
  NotFound,
} from '../shared/components';
import { SERIF } from '../shared/constants/fontTypes';
import authService from '../shared/services/authService';
import { tokenSelector, userSettingsSelector } from '../shared/store/selectors';
import AdventureBrowser from './components/AdventureBrowser';
import Cover from './components/Cover';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import Library from './components/Library';
import Profile from './components/Profile';
import Read from './components/Read/Read';
import * as routes from './constants/routes';
import styles from './ReaderApp.module.css';
import { getUserLibrary } from './store/actions/libraryActions';

const ReaderApp = ({ token, userSettings, getUserLibrary }) => {
  useEffect(() => {
    if (authService.isAuthenticated(token)) {
      getUserLibrary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fontStyle = {
    fontSize: userSettings.fontSize + 'em',
    fontFamily:
      userSettings.fontType === SERIF
        ? '"Merriweather", serif'
        : '"Roboto", sans-serif',
  };

  return (
    <React.Fragment>
      <div className={styles.container} style={fontStyle}>
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
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
    userSettings: userSettingsSelector(state),
  };
};

export default connect(
  mapStateToProps,
  { getUserLibrary }
)(ReaderApp);
