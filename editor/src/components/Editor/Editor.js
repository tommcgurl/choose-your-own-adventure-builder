import React, { useState } from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import { updateStoryPart } from '../../actions/editorActions';
import { navigate } from '../../actions/pageActions';
import { changeStoryPartKey } from '../../actions/draftActions';
import getCurrentDraft from '../../selectors/getCurrentDraft';
import * as routes from '../../constants/routes';
import styles from './Editor.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = ({
  editorState,
  storyPartKey,
  currentDraft,
  setEditorState,
  goBack,
  updateStoryPartKey,
}) => {
  const [newStoryPartKey, setNewStoryPartKey] = useState(storyPartKey);
  const [editingKey, setEditingKey] = useState(false);

  function handleNewStoryPartKeyChange(e) {
    setNewStoryPartKey(e.target.value);
  }

  function handleNewStoryPartKeyEditClick() {
    setEditingKey(true);
  }

  function handleNewStoryPartKeySaveClick(e) {
    e.preventDefault();
    updateStoryPartKey(storyPartKey, newStoryPartKey, currentDraft.id);
    setEditingKey(false);
  }

  function handleNewStoryPartKeyCancelClick() {
    setEditingKey(false);
    setNewStoryPartKey(storyPartKey);
  }

  return (
    <div className={styles.container}>
      <button onClick={goBack}>Back</button>
      {editingKey ? (
        <form>
          <input
            value={newStoryPartKey}
            onChange={handleNewStoryPartKeyChange}
          />
          <input
            type="submit"
            value="Save"
            onClick={handleNewStoryPartKeySaveClick}
          />
          <input
            type="button"
            value="Cancel"
            onClick={handleNewStoryPartKeyCancelClick}
          />
        </form>
      ) : (
        <div>
          {storyPartKey === 'intro' ? (
            'Intro'
          ) : (
            <>
              {storyPartKey}
              <button onClick={handleNewStoryPartKeyEditClick}>Edit</button>
            </>
          )}
        </div>
      )}

      <Wysiwyg
        editorState={editorState}
        onEditorStateChange={newState =>
          setEditorState(newState, storyPartKey, currentDraft.id)
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
    currentDraft: getCurrentDraft(state),
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
    updateStoryPartKey: (oldKey, newKey, draftId) => {
      dispatch(changeStoryPartKey(oldKey, newKey, draftId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
