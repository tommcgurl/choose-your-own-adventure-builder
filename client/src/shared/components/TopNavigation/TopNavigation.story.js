import React from 'react';
import { storiesOf } from '@storybook/react';
import { TopNavigation } from './TopNavigation';
import { BrowserRouter as Router } from 'react-router-dom';

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
  }
]
storiesOf('Components|TopNavigation', module)
  .addParameters({ component: TopNavigation })
  .add('Authenticated User', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={() => { }}
        isAuthenticated={true}
      />
    </Router>

  ))
  .add('Non-authenticated User', () => (
    <Router>
      <TopNavigation
        navItems={testNavItems}
        logout={() => { }}
        isAuthenticated={false}
      />
    </Router>
  ))