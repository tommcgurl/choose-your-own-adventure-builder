import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import './Wysiwyg.css';
import styles from './Wysiwyg.module.css';

/**
 * You can use tab, bold (ctrl+b), underline (ctrl+u), and italicize (ctrl+i).
 */
const Wysiwyg = ({ defaultEditorState, onChange, ...rest }) => {
  const [editorState, setEditorState] = useState(
    defaultEditorState || EditorState.createEmpty()
  );
  const editorRef = useRef(null);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  function handleEditorChange(state) {
    setEditorState(state);
    if (typeof onChange === 'function') {
      onChange(state);
    }
  }

  function handleEditorContainerClick() {
    editorRef.current.focus();
  }

  function handleTab(e) {
    e.preventDefault();

    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();

    if (
      blockType === 'unordered-list-item' ||
      blockType === 'ordered-list-item'
    ) {
      const newState = RichUtils.onTab(e, editorState, 3);
      handleEditorChange(newState);
    } else {
      const newContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '\t'
      );
      handleEditorChange(
        EditorState.push(editorState, newContentState, 'insert-characters')
      );
    }
  }

  return (
    <div className={styles.root} {...rest}>
      <div className={styles.editor} onClick={handleEditorContainerClick}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          onTab={handleTab}
          ref={editorRef}
        />
      </div>
    </div>
  );
};

Wysiwyg.propTypes = {
  /**
   * The EditorState to start with.
   * The component will thereafter track state internally
   * and fire onChange AFTER it updates its state internally.
   */
  defaultEditorState: PropTypes.instanceOf(EditorState),
  /**
   * Fired AFTER updating state internally, passing the updated EditorState.
   */
  onChange: PropTypes.func,
};

export default Wysiwyg;
