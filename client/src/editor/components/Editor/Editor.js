import { convertFromRaw, EditorState } from 'draft-js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import Wysiwyg from '../../../shared/components/Wysiwyg';
import useDebounce from '../../../shared/hooks/useDebounce';
import * as routes from '../../constants/routes';
import ModalContext from '../../contexts/SetModalPropsContext';
import {
  changeStoryPartName,
  saveStoryPart,
} from '../../store/actions/draftActions';
import { draftSelector } from '../../store/selectors';
import { storyNameIsValid } from '../../validators';
import ChoiceBuilder from '../ChoiceBuilder';
import styles from './Editor.module.css';

const Editor = ({
  getDraft,
  saveStoryPart,
  history,
  match,
  changeStoryPartName,
}) => {
  const setModalProps = useContext(ModalContext);
  const storyPartKey = decodeURI(match.params.storyPartKey);
  const draft = getDraft(match.params.draftId);
  const storyPartNameRef = useRef(null);
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

  function handleStoryPartNameEditClick() {
    setEditingKey(true);
  }

  function handleEditStoryPartNameSaveClick(e) {
    e.preventDefault();
    const name = storyPartNameRef.current.value;
    if (storyNameIsValid(name, draft.mainStory.storyParts)) {
      changeStoryPartName(storyPartKey, name, draft.id);
      setEditingKey(false);
    }
  }

  function handleEditStoryPartNameCancelClick() {
    setEditingKey(false);
    storyPartNameRef.current.value =
      draft.mainStory.storyParts[storyPartKey].name;
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

  function handlePromptModalClick() {
    setModalProps({
      isOpen: true,
      children: (
        <ChoiceBuilder draftId={draft.id} storyPartKey={storyPartKey} />
      ),
    });
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
            defaultValue={draft.mainStory.storyParts[storyPartKey].name}
            ref={storyPartNameRef}
          />
          <input
            type="submit"
            value="Save"
            onClick={handleEditStoryPartNameSaveClick}
          />
          <input
            type="button"
            value="Cancel"
            onClick={handleEditStoryPartNameCancelClick}
          />
        </form>
      ) : (
        <div>
          {storyPartKey === 'intro' ? (
            'Intro'
          ) : (
            <React.Fragment>
              {draft.mainStory.storyParts[storyPartKey].name}
              <Button onClick={handleStoryPartNameEditClick}>Edit</Button>
            </React.Fragment>
          )}
        </div>
      )}

      <Wysiwyg
        defaultEditorState={editorState}
        onChange={handleEditorStateChange}
      />

      <Button onClick={handlePromptModalClick}>Edit User Choices</Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getDraft: id => draftSelector(state)(id),
  };
};

export default connect(
  mapStateToProps,
  {
    saveStoryPart,
    changeStoryPartName,
  }
)(Editor);
