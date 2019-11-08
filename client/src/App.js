import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BigDivEnergy, Button, Inline } from './shared/components';
import { fetchGenres } from './shared/store/actions/listActions';

const EditorApp = lazy(() => import('./editor/EditorApp'));
const ReaderApp = lazy(() => import('./reader/ReaderApp'));

const App = ({ fetchGenres }) => {
  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ConvenienceLinks = ({ history }) => {
    return (
      <Inline>
        {/* These buttons have inline styles for now since we aren't importing any CSS modules into this file but we should eventually update them to use classNames */}
        <Button id="reader-button" onClick={() => history.push('/reader')}>
          {'Go To Reader'}
        </Button>
        <Button id="editor-button" onClick={() => history.push('/editor')}>
          {'Go To Editor'}
        </Button>
      </Inline>
    );
  };

  return (
    <BigDivEnergy>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/reader" component={ReaderApp} />
            <Route path="/editor" component={EditorApp} />
            <Route render={props => <ConvenienceLinks {...props} />} />
          </Switch>
        </Suspense>
      </Router>
    </BigDivEnergy>
  );
};

export default connect(
  null,
  { fetchGenres }
)(App);
