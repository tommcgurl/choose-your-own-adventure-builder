import React from 'react';
import styles from './DraftEditor.module.css';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import { change } from '../../actions/editorActions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftEditor = ({ editorState, setEditorState }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={newState => setEditorState(newState)}
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
      toolbar={{
        blockType: {
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Blockquote'],
        },
        fontSize: {
          className: styles.hidden,
        },
        embedded: {
          className: styles.hidden,
        },
        link: {
          className: styles.hidden,
        },
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    editorState: state.editorState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditorState: editorState => {
      dispatch(change(editorState));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraftEditor);
