import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
import Library from './components/Library';
import AuthRedirect from './components/AuthRedirect';
import * as routes from './constants/routes';

const App = props => {
  function renderStory({ title, intro, items, mainStory, colorPalette }) {
    return (
      <AdventureManager
        intro={intro}
        title={title}
        items={items}
        mainStory={mainStory}
        colorPalette={colorPalette}
      />
    );
  }

  function NotFound(props) {
    return <div>404, bud.</div>;
  }

  return (
    <Router>
      <div className={styles.container}>
        <nav>
          <Link to={routes.LIBRARY}>LIBRARY</Link>
          <Link to={routes.ROOT}>BROWSE</Link>
          <Link to={routes.READ}>READ</Link>
        </nav>
        <Switch>
          <Route exact path={routes.ROOT} component={AdventureBrowser} />
          <Route path={routes.LIBRARY} component={Library} />
          <Route
            path={routes.READ}
            component={props => (
              <AdventureProvider {...props}>{renderStory}</AdventureProvider>
            )}
          />
          <Route path={routes.AUTH_REDIRECT} component={AuthRedirect} />
          <Route path={routes.NOT_FOUND} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
