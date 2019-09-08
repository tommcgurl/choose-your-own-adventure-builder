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
        nextBranchName: 'Run Away',
      }]}
      promptText={'What will you do?'}
    />
  ))
  .add('multiple choices', () => (
    <ChoiceDiagram
      storyPartName={'Intro'}
      choices={[{
        text: 'Run!',
        nextBranchName: 'Run Away',
      }, {
        text: 'Stand and fight!',
        nextBranchName: 'Fight this thing.',
      }, {
        text: 'Try and stall',
        nextBranchName: 'End up dead.',
      }]}
      promptText={'What will you do?'}
    />
  ))
  .add('multiple choices no interactions.', () => (
    <ChoiceDiagram
      readOnly={true}
      storyPartName={'Intro'}
      choices={[{
        text: 'Run!',
        nextBranchName: 'Run Away',
      }, {
        text: 'Stand and fight!',
        nextBranchName: 'Fight this thing.',
      }, {
        text: 'Try and stall',
        nextBranchName: 'End up dead.',
      }]}
      promptText={'What will you do?'}
    />
  ))


