import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { ContentState, EditorState } from 'draft-js';
import React from 'react';
import Wysiwyg from './Wysiwyg';

storiesOf('Components|Wysiwyg', module)
  .addParameters({ component: Wysiwyg })
  .add('default', () => <Wysiwyg />)
  .add('with defaultEditorState', () => {
    const editorState = EditorState.createWithContent(
      ContentState.createFromText('Hi there!')
    );
    return <Wysiwyg defaultEditorState={editorState} />;
  })
  .add('with changeHandler', () => <Wysiwyg onChange={action('onChange')} />)
  .add('with other props', () => (
    <Wysiwyg style={{ width: 200, height: 700 }} />
  ));
