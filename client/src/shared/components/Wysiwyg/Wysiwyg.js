import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi';
import './Wysiwyg.css';
import styles from './Wysiwyg.module.css';

const inlineStyles = {
  bold: 'BOLD',
  italic: 'ITALIC',
  underline: 'UNDERLINE',
};

/**
 * You can use tab, bold (ctrl+b), underline (ctrl+u), and italicize (ctrl+i).
 */
const Wysiwyg = ({ defaultEditorState, onChange, hideToolbar, ...rest }) => {
  const [editorState, setEditorState] = useState(
    defaultEditorState || EditorState.createEmpty()
  );
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

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
    setBold(editorState.getCurrentInlineStyle().has(inlineStyles.bold));
    setItalic(editorState.getCurrentInlineStyle().has(inlineStyles.italic));
    setUnderline(
      editorState.getCurrentInlineStyle().has(inlineStyles.underline)
    );
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

  function handleToolbarButtonClick(command) {
    editorRef.current.focus();
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, command));
  }

  return (
    <div className={styles.root} {...rest}>
      {!hideToolbar && (
        <div className={styles.toolbar}>
          <FiBold
            className={bold ? styles.toolbarButtonActive : styles.toolbarButton}
            onClick={() => handleToolbarButtonClick(inlineStyles.bold)}
          />
          <FiItalic
            className={
              italic ? styles.toolbarButtonActive : styles.toolbarButton
            }
            onClick={() => handleToolbarButtonClick(inlineStyles.italic)}
          />
          <FiUnderline
            className={
              underline ? styles.toolbarButtonActive : styles.toolbarButton
            }
            onClick={() => handleToolbarButtonClick(inlineStyles.underline)}
          />
        </div>
      )}
      <div className={styles.editor} onClick={handleEditorContainerClick}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          spellCheck={true}
          handleKeyCommand={handleKeyCommand}
          onTab={handleTab}
          ref={editorRef}
        />
      </div>
    </div>
  );
};

Wysiwyg.defaultProps = {
  hideToolbar: false,
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

  hideToolbar: PropTypes.bool,
};

export default Wysiwyg;
