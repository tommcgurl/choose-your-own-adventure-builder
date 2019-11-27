import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Inline from '../Inline/Inline';
import Menu from './Menu';

storiesOf('Components|Menu', module)
  .addParameters({ component: Menu })
  .add('default', () => (
    <Menu>
      <div onClick={action('Option 1 clicked')}>Option 1</div>
      <div onClick={action('Option 2 clicked')}>Option 2</div>
    </Menu>
  ))
  .add('className', () => (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .menu {
        width: 200px;
      }
      `,
        }}
      />
      <Menu className={'menu'}>
        <div onClick={action('Option 1 clicked')}>Option 1</div>
        <div onClick={action('Option 2 clicked')}>Option 2</div>
      </Menu>
    </div>
  ))
  .add('align right', () => (
    <Inline align="right">
      <Menu align="right">
        <div onClick={action('Option 1 clicked')}>Option 1</div>
        <div onClick={action('Option 2 clicked')}>Option 2</div>
      </Menu>
    </Inline>
  ))
  .add('button as string', () => (
    <Menu button="My Menu">
      <div onClick={action('Option 1 clicked')}>Option 1</div>
      <div onClick={action('Option 2 clicked')}>Option 2</div>
    </Menu>
  ))
  .add('button as function', () => (
    <Menu button={props => <button {...props}>My Button</button>}>
      <div onClick={action('Option 1 clicked')}>Option 1</div>
      <div onClick={action('Option 2 clicked')}>Option 2</div>
    </Menu>
  ));
