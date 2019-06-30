import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { isAuthenticated } from '../shared/services/authService';
import { tokenSelector } from '../shared/store/selectors';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import Library from './components/Library';
import { SANS_SERIF, SERIF } from './constants/fontTypes';
import * as routes from './constants/routes';
import styles from './ReaderApp.module.css';
import { getUserLibrary } from './store/actions/libraryActions';
import { userSettingsSelector } from './store/selectors';
import ReaderView from './components/ReaderView';

const ReaderApp = ({ token, userSettings, loadUserLibrary }) => {
  const rootRef = useRef(document.getElementById('root'));

  useEffect(() => {
    if (userSettings.nightMode) {
      rootRef.current.style.setProperty('--text-color', '#c4c4c4');
      rootRef.current.style.setProperty('--bg-color', '#181818');
    } else {
      rootRef.current.style.setProperty('--text-color', '#0b0b0b');
      rootRef.current.style.setProperty('--bg-color', '#fbfbfb');
    }
  }, [userSettings.nightMode]);

  useEffect(() => {
    if (userSettings.fontType === SERIF) {
      rootRef.current.style.setProperty(
        '--font-family',
        '"Merriweather", serif'
      );
    } else if (userSettings.fontType === SANS_SERIF) {
      rootRef.current.style.setProperty(
        '--font-family',
        '"Roboto", sans-serif'
      );
    }
  }, [userSettings.fontType]);

  useEffect(() => {
    rootRef.current.style.setProperty(
      '--text-size',
      userSettings.fontSize + 'em'
    );
  }, [userSettings.fontSize]);

  useEffect(() => {
    if (isAuthenticated(token)) {
      loadUserLibrary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderStory({ id, title, intro, items, mainStory }) {
    return (
      <AdventureManager
        id={id}
        intro={intro}
        title={title}
        items={items}
        mainStory={mainStory}
      />
    );
  }

  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path={routes.ROOT} component={AdventureBrowser} />
        <AuthRoute
          path={routes.LIBRARY}
          loginPath={routes.ROOT}
          component={Library}
        />
        <AuthRoute
          path={routes.READ}
          loginPath={routes.ROOT}
          component={props => (
            <AdventureProvider {...props}>
              {rp => <ReaderView {...rp} />}
            </AdventureProvider>
          )}
        />
        <Route
          path={routes.AUTH_REDIRECT}
          render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
        />
        <Route path={routes.NOT_FOUND} component={NotFound} />
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
