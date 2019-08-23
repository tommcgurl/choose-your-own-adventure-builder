import { storiesOf } from '@storybook/react';
import { EditorState } from 'draft-js';
import React from 'react';
import Wysiwyg from './Wysiwyg';

let editorState = EditorState.createEmpty();

function handleChange(state) {
  editorState = { ...state };
}

storiesOf('Components|Wysiwyg', module)
  .addParameters({ component: Wysiwyg })
  .add('default', () => (
    <Wysiwyg editorState={editorState} onChange={handleChange} />
  ));
