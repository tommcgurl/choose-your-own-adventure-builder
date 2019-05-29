import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const EditorApp = lazy(() => import('./editor/App'));
const ReaderApp = lazy(() => import('./reader/App'));

const App = props => {
  const ConvenienceLinks = ({ history }) => {
    return (
      <>
        <button onClick={() => history.push('/reader')}>
          {'Go To Reader'}
        </button>
        <button onClick={() => history.push('/editor')}>
          {'Go To Editor'}
        </button>
      </>
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

export default App;
