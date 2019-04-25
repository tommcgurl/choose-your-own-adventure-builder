import React, { useState } from 'react';
import styles from './DraftEditor.module.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={newState => setEditorState(newState)}
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
    />
  );
};

export default DraftEditor;
