import { convertFromRaw, EditorState } from 'draft-js';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  BUTTON_VARIANTS,
  popModal,
  Wysiwyg,
} from '../../../shared/components';
import ChoiceDiagram from '../../../shared/components/ChoiceDiagram';
import useDebounce from '../../../shared/hooks/useDebounce';
import * as routes from '../../constants/routes';
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
  const storyPartKey = decodeURI(match.params.storyPartKey);
  const draft = getDraft(match.params.draftId);
  const storyPartNameRef = useRef(null);
  const storyPartName =
    storyPartKey === 'blurb' ? 'blurb' : draft.storyParts[storyPartKey].name;
  const currentStoryPart = draft.storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const choicesWithNames = choices.map(choice => {
    const nextBranchName = draft.storyParts[choice.nextBranch].name;
    return {
      ...choice,
      nextBranchName,
    };
  });

  const promptText =
    currentStoryPart && currentStoryPart.prompt && currentStoryPart.prompt.text;

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
    const storyPartKeys = Object.keys(draft.storyParts);
    if (!draft.firstPartId && storyPartKeys.length > 0) {
      setFirstPartId(storyPartKeys[0]);
      setAdventureFirstPartId(storyPartKeys[0], draft.id);
    }
  }, [
    draft.id,
    draft.firstPartId,
    draft.storyParts,
    setAdventureFirstPartId,
    setFirstPartId,
  ]);

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
    popModal(<ChoiceBuilder draftId={draft.id} storyPartKey={storyPartKey} />);
  }

  function handleOnSelectFirstBranch(e) {
    setFirstPartId(e.target.value);
    const key = Object.keys(draft.storyParts).find(k => k === e.target.value);
    setAdventureFirstPartId(key, draft.id);
  }

  return (
    <div className={styles.container}>
      {storyPartKey === 'blurb' ? (
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <h2>Blurb</h2>
            <p className={styles.descriptionText}>
              The blurb is a short description of your adventure to the reader.
              Example:{' '}
              <em>
                Navigate the terrors of a haunted house and escape with your
                life... if you make the correct decisions. This adventure is
                dark and spooky and contains thematic elements of ghostly
                behavior and untimely demises.
              </em>
              <br />
              <br />
              The blurb will be shown on your adventure's cover page, and serves
              as the reader's first exposure to your adventure. From the cover
              page, the reader may then choose to <strong>Embark</strong> upon
              your adventure. Please select the story part from which your
              readers will start the adventure.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <div className={styles.headerContainer}>
              <h2>Story Part Branch </h2>
              <div className={styles.autoSaveButton}>
                <input
                  id="autosave-toggle"
                  type="checkbox"
                  checked={autoSaveOn}
                  onChange={handleAutoSaveCheckboxChange}
                />
                <label htmlFor="autosave-toggle">Autosave</label>
              </div>
            </div>
            <p className={styles.descriptionText}>
              The main plot of your adventure takes place within{' '}
              <strong>Story Parts</strong> or <strong>Branches</strong>. This is
              where you describe to the reader what is happening as a result of
              the choice they've made. At the end of the story part, the reader
              will be prompted to take action. Example:{' '}
              <em>
                You turn the key and the large oak door takes significant effort
                to be pushed open. To your left is parlor that leads to a
                library. To the right are stairs leading up. Where shall you
                explore first?
              </em>
              <br />
              <br />
              You may then create choices for the reader, linking those choices
              to their respective story parts. Example:{' '}
              <strong>Choice Text</strong>: <em>Investigate the parlor</em> ->{' '}
              <strong>Story Part</strong>: <em>Parlor</em>
            </p>
          </div>
        </div>
      )}
      {editingKey ? (
        <form>
          <input defaultValue={storyPartName} ref={storyPartNameRef} />
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
          {storyPartKey !== 'blurb' && (
            <div className={styles.storyPartNameContainer}>
              <h4 className={styles.storyPartName}>{storyPartName}</h4>
              <Button
                variant={BUTTON_VARIANTS.BORDERLESS}
                onClick={handleStoryPartNameEditClick}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}

      <Wysiwyg
        defaultEditorState={editorState}
        onChange={handleEditorStateChange}
      />
      {storyPartKey === 'blurb' ? (
        <BranchSelector
          options={Object.keys(draft.storyParts).map(k => ({
            value: k,
            text: draft.storyParts[k].name,
          }))}
          labelText={'Select the first story part'}
          selectInputId={'select-first-story-part'}
          onSelect={handleOnSelectFirstBranch}
          value={firstPartId}
        />
      ) : (
        <Button onClick={handlePromptModalClick}>
          {`${choices.length ? 'Edit' : 'Add'} Choices`}
        </Button>
      )}

      <div className={styles.choiceDiagramContainer}>
        <ChoiceDiagram
          readOnly={true}
          storyPartName={storyPartName}
          choices={choicesWithNames}
          promptText={promptText}
        />
      </div>

      <div className={styles.buttonBar}>
        <Button
          variant={BUTTON_VARIANTS.DESTRUCTIVE}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        {!autoSaveOn && (
          <Button
            variant={BUTTON_VARIANTS.ACTION}
            onClick={handleSaveClick}
            disabled={!changesPendingSave}
          >
            Save
          </Button>
        )}
      </div>
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
