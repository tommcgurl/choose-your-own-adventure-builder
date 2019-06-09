import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { logOut } from '../shared/actions/authActions';
import AuthRedirect from '../shared/components/AuthRedirect';
import AuthRoute from '../shared/components/AuthRoute';
import NotFound from '../shared/components/NotFound';
import { API_URL } from '../shared/constants';
import { NOT_FOUND } from '../shared/constants/routes';
import { isAuthenticated } from '../shared/services/authService';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
  toggleFontType,
  toggleNightMode,
} from './actions/userSettingsActions';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import Library from './components/Library';
import { SANS_SERIF, SERIF } from './constants/fontTypes';
import * as routes from './constants/routes';

const ReaderApp = ({
  token,
  logOut,
  adventure,
  nightModeIsOn,
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  toggleNightMode,
  fontType,
  toggleFontType,
}) => {
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

  const root = document.getElementById('root');

  useEffect(() => {
    if (nightModeIsOn) {
      root.style.setProperty('--text-color', '#c4c4c4');
      root.style.setProperty('--bg-color', '#181818');
    } else {
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--bg-color', 'white');
    }
  }, [nightModeIsOn]);

  useEffect(() => {
    if (fontType === SERIF) {
      root.style.setProperty('--font-family', '"Merriweather", serif');
    } else if (fontType === SANS_SERIF) {
      root.style.setProperty('--font-family', '"Roboto", sans-serif');
    }
  }, [fontType]);

  root.style.setProperty('--text-size', fontSize + 'em');

  return (
    <div className={styles.container}>
      <nav className={styles.navheader}>
        <NavLink
          exact
          to={routes.ROOT}
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
        >
          {'Browse'}
        </NavLink>
        <NavLink
          exact
          to={routes.READ}
          className={styles.linkButton}
          activeClassName={styles.linkButtonSelected}
        >
          {'Read'}
        </NavLink>
        {isAuthenticated(token) ? (
          <>
            <NavLink
              exact
              to={routes.LIBRARY}
              className={styles.linkButton}
              activeClassName={styles.linkButtonSelected}
            >
              {'Library'}
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
              {'Log in with Google '}
            </a>
            <a
              className={styles.fakeButton}
              href={`${API_URL}/auth/reader/facebook`}
            >
              {'Log in with Facebook '}
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
          {nightModeIsOn ? 'Turn off Night Mode' : 'Turn On Night Mode'}
        </button>
        <button onClick={increaseFontSize}>Text Size +</button>
        <button onClick={decreaseFontSize}>Text Size -</button>
        <button onClick={resetFontSize}>Reset Text Size</button>
        <button onClick={toggleFontType}>
          {fontType === SERIF ? 'Switch to Sans-Serif' : 'Switch to Serif'}
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
    token: state.token,
    adventure: state.reader.adventure,
    nightModeIsOn: state.reader.userSettings.nightMode,
    fontSize: state.reader.userSettings.fontSize,
    fontType: state.reader.userSettings.fontType,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderApp);
