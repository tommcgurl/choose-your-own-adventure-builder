import React, { useState } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';

const Wysiwyg = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default Wysiwyg;
