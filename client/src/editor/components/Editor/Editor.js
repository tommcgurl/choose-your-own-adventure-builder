import { convertFromRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import Wysiwyg from '../../../shared/components/Wysiwyg';
import useDebounce from '../../../shared/hooks/useDebounce';
import * as routes from '../../constants/routes';
import { addChoiceToStoryPart, changePromptText, changeStoryPartKey, removeChoiceFromStoryPart, saveStoryPart, selectStoryPartNextBranchId } from '../../store/actions/draftActions';
import { draftSelector } from '../../store/selectors';
import ChoiceBuilder from '../ChoiceBuilder';
import styles from './Editor.module.css';

const Editor = ({
  getDraft,
  updateStoryPartKey,
  updateStoryPartNextBranchId,
  updateStoryPartPromptText,
  updateStoryPartAddChoice,
  saveStoryPart,
  updateStoryPartRemoveChoice,
  history,
  match,
}) => {
  const storyPartKey = decodeURI(match.params.storyPartKey);
  const draft = getDraft(match.params.draftId);

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
    return <Redirect to={routes.NOT_FOUND} />;
  }

  function handleNewStoryPartKeyChange(e) {
    setNewStoryPartKey(e.target.value);
  }

  function handleNewStoryPartKeyEditClick() {
    setEditingKey(true);
  }

  function handleNewStoryPartKeySaveClick(e) {
    e.preventDefault();
    updateStoryPartKey(storyPartKey, newStoryPartKey, draft.id);
    setEditingKey(false);
  }

  function handleNewStoryPartKeyCancelClick() {
    setEditingKey(false);
    setNewStoryPartKey(storyPartKey);
  }

  function handleSelectNextBranch(event) {
    updateStoryPartNextBranchId(storyPartKey, draft.id, event.target.value);
  }

  function handleChangePromptText(promptText) {
    updateStoryPartPromptText(storyPartKey, draft.id, promptText)
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
      <Button onClick={() => history.goBack()}>Back</Button>
      <input
        id="autosave-toggle"
        type="checkbox"
        checked={autoSaveOn}
        onChange={handleAutoSaveCheckboxChange}
      />
      <label htmlFor="autosave-toggle">Autosave</label>
      {!autoSaveOn && (
        <Button onClick={handleSaveClick} disabled={!changesPendingSave}>
          Save
        </Button>
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
                <React.Fragment>
                  {newStoryPartKey}
                  <Button onClick={handleNewStoryPartKeyEditClick}>Edit</Button>
                </React.Fragment>
              )}
          </div>
        )}

      <Wysiwyg
        defaultEditorState={editorState}
        onChange={handleEditorStateChange}
      />

      <ChoiceBuilder
        storyPartKey={storyPartKey}
        storyParts={draft.mainStory.storyParts || {}}
        onSelectNextBranch={handleSelectNextBranch}
        onChangePromptText={handleChangePromptText}
        onAddChoice={handleAddChoice}
        onRemoveChoice={handleRemoveChoice}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getDraft: id => draftSelector(state)(id),
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
    updateStoryPartPromptText: (storyPartKey, currentDraftId, promptText) => {
      dispatch(
        changePromptText(storyPartKey, currentDraftId, promptText)
      )
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
