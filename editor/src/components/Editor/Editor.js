import React from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import { updateStoryPart } from '../../actions/editorActions';
import { navigate } from '../../actions/pageActions';
import * as routes from '../../constants/routes';
import styles from './Editor.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = ({
  editorState,
  storyPartKey,
  adventureId,
  setEditorState,
  goBack,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={goBack}>Back</button>
      <Wysiwyg
        editorState={editorState}
        onEditorStateChange={newState =>
          setEditorState(newState, storyPartKey, adventureId)
        }
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    editorState: state.editor.state,
    storyPartKey: state.editor.storyPartKey,
    adventureId: state.currentDraftId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditorState: (editorState, storyPartKey, adventureId) => {
      dispatch(updateStoryPart(editorState, storyPartKey, adventureId));
    },
    goBack: () => {
      dispatch(navigate(routes.DRAFT));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
