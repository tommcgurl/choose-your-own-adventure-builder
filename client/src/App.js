import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './shared/components/NotFound';

const EditorApp = lazy(() => import('./editor/components/EditorApp'));
const ReaderApp = lazy(() => import('./reader/App'));

const App = props => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/reader" component={ReaderApp} />
          <Route path="/editor" component={EditorApp} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
