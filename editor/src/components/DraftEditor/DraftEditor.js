import React, { useState } from 'react';
import styles from './DraftEditor.modules.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <Editor editorState={editorState} onEditorStateChange={setEditorState} />
  );
};

export default DraftEditor;
