import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import authService from '../shared/services/authService';
import { tokenSelector } from '../shared/store/selectors';
import AdventureBrowser from './components/AdventureBrowser';
import Cover from './components/Cover';
import Library from './components/Library';
import Read from './components/Read/Read';
import { SERIF } from './constants/fontTypes';
import * as routes from './constants/routes';
import styles from './ReaderApp.module.css';
import { getUserLibrary } from './store/actions/libraryActions';
import { userSettingsSelector } from './store/selectors';

const ReaderApp = ({ token, userSettings, loadUserLibrary }) => {
  useEffect(() => {
    if (authService.isAuthenticated(token)) {
      loadUserLibrary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerClass = userSettings.nightMode
    ? styles.workinOnTheNightMode
    : styles.lightMode;

  const fontStyle = {
    fontSize: userSettings.fontSize + 'em',
    fontFamily:
      userSettings.fontType === SERIF
        ? '"Merriweather", serif'
        : '"Roboto", sans-serif',
  };

  return (
    <div className={`${styles.container} ${containerClass}`} style={fontStyle}>
      <Switch>
        <Route exact path={routes.ROOT} component={AdventureBrowser} />
        <Route
          path={routes.AUTH_REDIRECT}
          render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
        />
        <Route path={routes.NOT_FOUND} component={NotFound} />
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
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
    userSettings: userSettingsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserLibrary: () => {
      dispatch(getUserLibrary());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderApp);
