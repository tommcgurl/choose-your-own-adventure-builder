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
  setAdventureFirstPartId,
} from '../../store/actions/draftActions';
import { draftSelector } from '../../store/selectors';
import { storyNameIsValid } from '../../validators';
import BranchSelector from '../BranchSelector';
import ChoiceBuilder from '../ChoiceBuilder';
import styles from './Editor.module.css';

const Editor = ({
  getDraft,
  saveStoryPart,
  history,
  match,
  changeStoryPartName,
  setAdventureFirstPartId,
}) => {
  const setModalProps = useContext(ModalContext);
  const storyPartKey = decodeURI(match.params.storyPartKey);
  const draft = getDraft(match.params.draftId);
  const storyPartNameRef = useRef(null);
  const [editorState, setEditorState] = useState(() => {
    const rawContent = draft
      ? storyPartKey === 'blurb'
        ? draft.blurb
        : draft.storyParts[storyPartKey] && draft.storyParts[storyPartKey].plot
      : null;

    return (
      rawContent && EditorState.createWithContent(convertFromRaw(rawContent))
    );
  });
  const [editingKey, setEditingKey] = useState(false);
  const [changesPendingSave, setChangesPendingSave] = useState(false);
  const [autoSaveOn, setAutoSaveOn] = useState(true);
  const [firstPartId, setFirstPartId] = useState(
    draft.firstPartId || Object.keys(draft.storyParts)[0]
  );

  useEffect(() => {
    if (!draft.firstPartId) {
      setAdventureFirstPartId(firstPartId, draft.id);
    }
  });

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
    if (storyNameIsValid(name, draft.storyParts)) {
      changeStoryPartName(name, storyPartKey, draft.id);
      setEditingKey(false);
    }
  }

  function handleEditStoryPartNameCancelClick() {
    setEditingKey(false);
    storyPartNameRef.current.value = draft.storyParts[storyPartKey].name;
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

  function handleOnSelectFirstBranch(e) {
    setFirstPartId(e.target.value);
    const key = Object.keys(draft.storyParts).find(k => k === e.target.value);
    setAdventureFirstPartId(key, draft.id);
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
            defaultValue={draft.storyParts[storyPartKey].name}
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
          {storyPartKey === 'blurb' ? (
            'Blurb'
          ) : (
            <React.Fragment>
              {draft.storyParts[storyPartKey].name}
              <Button onClick={handleStoryPartNameEditClick}>Edit</Button>
            </React.Fragment>
          )}
        </div>
      )}

      <Wysiwyg
        defaultEditorState={editorState}
        onChange={handleEditorStateChange}
      />
      {storyPartKey === 'blurb' ? (
        <BranchSelector
          options={Object.keys(draft.storyParts).map(key => ({
            value: key,
            text: draft.storyParts[key].name,
          }))}
          labelText={`Select Adventure's First Branch`}
          selectInputId={'adventure-first-branch'}
          onSelect={handleOnSelectFirstBranch}
          value={firstPartId}
        />
      ) : (
        <Button onClick={handlePromptModalClick}>Edit User Choices</Button>
      )}
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
    setAdventureFirstPartId,
  }
)(Editor);
