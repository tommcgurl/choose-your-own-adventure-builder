import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchGenres } from './shared/store/actions/listActions';

const EditorApp = lazy(() => import('./editor/EditorApp'));
const ReaderApp = lazy(() => import('./reader/ReaderApp'));

const App = ({ loadGenres }) => {
  useEffect(() => {
    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ConvenienceLinks = ({ history }) => {
    return (
      <React.Fragment>
        <button onClick={() => history.push('/reader')}>
          {'Go To Reader'}
        </button>
        <button onClick={() => history.push('/editor')}>
          {'Go To Editor'}
        </button>
      </React.Fragment>
    );
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/reader" component={ReaderApp} />
          <Route path="/editor" component={EditorApp} />
          <Route render={props => <ConvenienceLinks {...props} />} />
        </Switch>
      </Suspense>
    </Router>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loadGenres: () => {
      dispatch(fetchGenres());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
