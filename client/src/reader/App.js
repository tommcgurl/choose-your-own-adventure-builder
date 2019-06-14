import isEmpty from 'lodash.isempty';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { API_URL } from '../shared/constants';
import { NOT_FOUND } from '../shared/constants/routes';
import { isAuthenticated } from '../shared/services/authService';
import { logOut } from '../shared/store/actions/authActions';
import { tokenSelector } from '../shared/store/selectors';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import Library from './components/Library';
import { SANS_SERIF, SERIF } from './constants/fontTypes';
import * as routes from './constants/routes';
import { getUserLibrary } from './store/actions/libraryActions';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
  toggleFontType,
  toggleNightMode,
} from './store/actions/userSettingsActions';
import {
  currentAdventureSelector,
  userSettingsSelector,
} from './store/selectors';

const ReaderApp = ({
  token,
  logOut,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  toggleNightMode,
  toggleFontType,
  userSettings,
  currentAdventure,
  loadUserLibrary,
}) => {
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
      <nav className={styles.navheader}>
        <NavLink
          exact
          to={routes.ROOT}
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
        >
          Browse
        </NavLink>
        {!isEmpty(currentAdventure) && (
          <NavLink
            exact
            to={routes.READ}
            className={styles.linkButton}
            activeClassName={styles.linkButtonSelected}
          >
            Read
          </NavLink>
        )}
        {isAuthenticated(token) ? (
          <>
            <NavLink
              exact
              to={routes.LIBRARY}
              className={styles.linkButton}
              activeClassName={styles.linkButtonSelected}
            >
              Library
            </NavLink>
            <button className={styles.fakeButton} onClick={logOut}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <a
              className={styles.fakeButton}
              href={`${API_URL}/auth/reader/google`}
            >
              Log in with Google
            </a>
            <a
              className={styles.fakeButton}
              href={`${API_URL}/auth/reader/facebook`}
            >
              Log in with Facebook
            </a>
          </>
        )}
      </nav>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button onClick={toggleNightMode}>
          {userSettings.nightModeIsOn
            ? 'Turn off Night Mode'
            : 'Turn On Night Mode'}
        </button>
        <button onClick={increaseFontSize}>Text Size +</button>
        <button onClick={decreaseFontSize}>Text Size -</button>
        <button onClick={resetFontSize}>Reset Text Size</button>
        <button onClick={toggleFontType}>
          {userSettings.fontType === SERIF
            ? 'Switch to Sans-Serif'
            : 'Switch to Serif'}
        </button>
      </div>
      <div className={styles.contentArea}>
        <Switch>
          <Route exact path={routes.ROOT} component={AdventureBrowser} />
          <AuthRoute
            path={routes.LIBRARY}
            loginPath={routes.ROOT}
            component={Library}
          />
          <Route
            path={routes.READ}
            component={props => (
              <AdventureProvider {...props}>{renderStory}</AdventureProvider>
            )}
          />
          <Route
            path={routes.AUTH_REDIRECT}
            render={props => <AuthRedirect rootPath={routes.ROOT} {...props} />}
          />
          <Route path={NOT_FOUND} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: tokenSelector(state),
    userSettings: userSettingsSelector(state),
    currentAdventure: currentAdventureSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
    toggleNightMode: () => {
      dispatch(toggleNightMode());
    },
    increaseFontSize: () => {
      dispatch(increaseFontSize());
    },
    decreaseFontSize: () => {
      dispatch(decreaseFontSize());
    },
    resetFontSize: () => {
      dispatch(resetFontSize());
    },
    toggleFontType: () => {
      dispatch(toggleFontType());
    },
    loadUserLibrary: () => {
      dispatch(getUserLibrary());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderApp);
