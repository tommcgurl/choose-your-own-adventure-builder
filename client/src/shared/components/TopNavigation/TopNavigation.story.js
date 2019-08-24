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
        logout={() => {}}
        isAuthenticated={true}
        app="editor"
      />
    </Router>
  ))
  .add('Non-authenticated User', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={() => {}}
        isAuthenticated={false}
        app="editor"
      />
    </Router>
  ));
