import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';

const testNavItems = [
  {
    label: 'Github',
    route: '//github.com/tommcgurl/choose-your-own-adventure-builder',
  },
  {
    label: 'PostgreSQL',
    route: '//www.postgresql.org/',
  },
  {
    label: 'GraphQL',
    route: '//graphql.org/',
  },
];
storiesOf('Components|TopNavigation', module)
  .addParameters({ component: TopNavigation })
  .add('Authenticated User', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={action('logout')}
        isAuthenticated={true}
        app="editor"
      />
    </Router>
  ))
  .add('Authenticated User with photo', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={action('logout')}
        isAuthenticated={true}
        app="editor"
        token={
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJWaXJ0dWFCb3phIiwiYmlvIjpudWxsLCJwaG90byI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21CZG13STdYdEtCOUlJSU9FeG5YaDNzLXBLSG84LTBpallKSVM0MW9BIiwiaWF0IjoxNTc0Mzg4NTM0LCJleHAiOjE1NzY5ODA1MzR9.2auxTSby6xT9O-QgTbB4aQ4hBbTOwbOB3AQyUNcwysw'
        }
      />
    </Router>
  ))
  .add('Non-authenticated User', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={action('logout')}
        isAuthenticated={false}
        app="editor"
      />
    </Router>
  ));
