import { storiesOf } from '@storybook/react';
import React from 'react';
import ChoiceDiagram from './ChoiceDiagram';

storiesOf('Components|ChoiceDiagram', module)
  .addParameters({ component: ChoiceDiagram })
  .add('single choice', () => (
    <ChoiceDiagram
      storyPartName={'Intro'}
      choices={[{
        text: 'Run!',
        storyPartName: 'Run Away',
      }]}
      promptText={'What will you do?'}
    />
  ))
  .add('multiple choices', () => (
    <ChoiceDiagram
      storyPartName={'Intro'}
      choices={[{
        text: 'Run!',
        storyPartName: 'Run Away',
      }, {
        text: 'Stand and fight!',
        storyPartName: 'Fight this thing.',
      }, {
        text: 'Try and stall',
        storyPartName: 'End up dead.',
      }]}
      promptText={'What will you do?'}
    />
  ))

