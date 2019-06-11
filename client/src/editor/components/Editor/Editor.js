import { convertFromRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NOT_FOUND } from '../../../shared/constants/routes';
import useDebounce from '../../../shared/hooks/useDebounce';
import * as routes from '../../constants/routes';
import {
  addChoiceToStoryPart,
  changeStoryPartKey,
  removeChoiceFromStoryPart,
  saveStoryPart,
  selectStoryPartNextBranchId,
} from '../../store/actions/draftActions';
import ChoiceBuilder from '../ChoiceBuilder';
import styles from './Editor.module.css';

const Editor = ({
  getCurrentDraft,
  updateStoryPartKey,
  updateStoryPartNextBranchId,
  updateStoryPartAddChoice,
  saveStoryPart,
  updateStoryPartRemoveChoice,
  history,
  match,
}) => {
  const storyPartKey = decodeURI(match.params.storyPartKey);
  const draft = getCurrentDraft(match.params.draftId);

  const [editorState, setEditorState] = useState(() => {
    const rawContent = draft
      ? storyPartKey === 'intro'
        ? draft.intro
        : draft.mainStory.storyParts[storyPartKey] &&
          draft.mainStory.storyParts[storyPartKey].plot
      : null;

    return (
      rawContent && EditorState.createWithContent(convertFromRaw(rawContent))
    );
  });
  const [newStoryPartKey, setNewStoryPartKey] = useState(storyPartKey);
  const [editingKey, setEditingKey] = useState(false);
  const [changesPendingSave, setChangesPendingSave] = useState(false);
  const [autoSaveOn, setAutoSaveOn] = useState(true);

  const debouncedSave = useDebounce(save, 1000);
  useEffect(() => {
    if (autoSaveOn && changesPendingSave) {
      debouncedSave(editorState);
    }
  });

  if (!editorState) {
    return <Redirect to={routes.ROOT + NOT_FOUND} />;
  }

  function handleNewStoryPartKeyChange(e) {
    setNewStoryPartKey(e.target.value);
  }

  function handleNewStoryPartKeyEditClick() {
    setEditingKey(true);
  }

  function handleNewStoryPartKeySaveClick(e) {
    e.preventDefault();
    updateStoryPartKey(storyPartKey, newStoryPartKey, draft);
    setEditingKey(false);
  }

  function handleNewStoryPartKeyCancelClick() {
    setEditingKey(false);
    setNewStoryPartKey(storyPartKey);
  }

  function handleSelectNextBranch(event) {
    updateStoryPartNextBranchId(storyPartKey, draft.id, event.target.value);
  }

  function handleAddChoice({ choiceText, choiceBranchId }) {
    updateStoryPartAddChoice(
      storyPartKey,
      draft.id,
      choiceText,
      choiceBranchId
    );
  }

  function handleRemoveChoice(choiceText) {
    updateStoryPartRemoveChoice(storyPartKey, draft.id, choiceText);
  }

  function save(state) {
    saveStoryPart(state, storyPartKey, draft.id);
    setChangesPendingSave(false);
  }

  function handleSaveClick() {
    save(editorState);
  }

  function handleEditorStateChange(newEditorState) {
    setEditorState(newEditorState);
    setChangesPendingSave(true);
  }

  function handleAutoSaveCheckboxChange(event) {
    setAutoSaveOn(event.target.checked);
  }

  return (
    <div className={styles.container}>
      <button onClick={() => history.goBack()}>Back</button>
      <input
        id="autosave-toggle"
        type="checkbox"
        checked={autoSaveOn}
        onChange={handleAutoSaveCheckboxChange}
      />
      <label htmlFor="autosave-toggle">Autosave</label>
      {!autoSaveOn && (
        <button onClick={handleSaveClick} disabled={!changesPendingSave}>
          Save
        </button>
      )}
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
        onEditorStateChange={handleEditorStateChange}
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
        storyParts={draft.mainStory.storyParts || {}}
        onSelectNextBranch={handleSelectNextBranch}
        onAddChoice={handleAddChoice}
        onRemoveChoice={handleRemoveChoice}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getCurrentDraft: id => state.editor.drafts[id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
    updateStoryPartAddChoice: (
      storyPartId,
      currentDraftId,
      choiceText,
      choiceBranchId
    ) => {
      dispatch(
        addChoiceToStoryPart(
          storyPartId,
          currentDraftId,
          choiceText,
          choiceBranchId
        )
      );
    },
    saveStoryPart: (editorState, storyPartKey, draftId) => {
      dispatch(saveStoryPart(editorState, storyPartKey, draftId));
    },
    updateStoryPartRemoveChoice: (storyPartId, currentDraftId, choiceText) => {
      dispatch(
        removeChoiceFromStoryPart(storyPartId, currentDraftId, choiceText)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
