import React, { useState } from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import {
  changeStoryPartKey,
  selectStoryPartNextBranchId,
} from '../../actions/draftActions';
import { updateStoryPart } from '../../actions/editorActions';
import getCurrentDraft from '../../selectors/getCurrentDraft';
import ChoiceBuilder from '../ChoiceBuilder';
import styles from './Editor.module.css';

const Editor = ({
  editorState,
  storyPartKey,
  currentDraft,
  setEditorState,
  updateStoryPartKey,
  updateStoryPartNextBranchId,
  history,
}) => {
  const [newStoryPartKey, setNewStoryPartKey] = useState(storyPartKey);
  const [editingKey, setEditingKey] = useState(false);
  const [nextBranchId, setNextBranchId] = useState('');

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

  function handleSelectNextBranch(event) {
    updateStoryPartNextBranchId(
      storyPartKey,
      currentDraft.id,
      event.target.value
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => history.goBack()}>Back</button>
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

      <ChoiceBuilder
        storyPartKey={storyPartKey}
        storyParts={currentDraft.mainStory.storyParts || {}}
        onSelectNextBranch={handleSelectNextBranch}
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
    updateStoryPartKey: (oldKey, newKey, draftId) => {
      dispatch(changeStoryPartKey(oldKey, newKey, draftId));
    },
    updateStoryPartNextBranchId: (
      storyPartKey,
      currentDraftId,
      nextBranchId
    ) => {
      dispatch(
        selectStoryPartNextBranchId(storyPartKey, currentDraftId, nextBranchId)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
