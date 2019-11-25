import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import {
  Inline,
  Input,
  popToast,
  TOAST_VARIANTS,
} from '../../../shared/components';
import Button, { VARIANTS } from '../../../shared/components/Button';
import { addStoryPart } from '../../store/actions/draftActions';
import BranchSelector from '../BranchSelector';
import styles from './NewChoiceForm.module.css';

const NewChoiceForm = ({
  currentDraftId,
  storyParts,
  storyPartId,
  onAddChoice,
  addStoryPart,
}) => {
  const choiceTextInputEl = useRef(null);
  const createNewBranchInputEl = useRef(null);
  // Just pick the first item in the list as the default value.
  // We will pass this to our BranchSelector as well.
  const initialChoiceBranchId = Object.keys(storyParts).filter(
    key => key !== storyPartId
  )[0];
  const [choiceBranchId, setChoiceBranchId] = useState(initialChoiceBranchId);
  const [creatingNewBranch, setCreatingNewBranch] = useState(false);

  const handleBranchSelection = e => {
    setChoiceBranchId(e.target.value);
  };

  const handleAddChoiceButtonClick = e => {
    e.preventDefault();
    const choiceText = choiceTextInputEl.current
      ? choiceTextInputEl.current.value
      : '';
    if (choiceText === '') {
      popToast('Choice text cannot be blank.', TOAST_VARIANTS.ERROR);
    } else {
      if (
        !storyParts[storyPartId].prompt.choices.find(
          c => c.nextBranch === choiceBranchId
        )
      ) {
        onAddChoice(
          storyPartId,
          currentDraftId,
          choiceText,
          choiceBranchId,
          storyParts[choiceBranchId].name
        );
        choiceTextInputEl.current.value = '';
      } else {
        popToast('A link to that branch already exists!', TOAST_VARIANTS.ERROR);
      }
    }
  };

  const handleCreateNewBranchClick = e => {
    e.preventDefault();
    setCreatingNewBranch(true);
  };

  const handleSaveNewBranchClick = e => {
    e.preventDefault();
    if (createNewBranchInputEl.current.value === '') {
      popToast('Branch name cannot be empty.', TOAST_VARIANTS.ERROR);
    } else {
      const newBranchName = createNewBranchInputEl.current
        ? createNewBranchInputEl.current.value
        : '';
      if (
        Object.keys(storyParts).find(
          id => storyParts[id].name === newBranchName
        )
      ) {
        popToast(
          'A branch with that name already exists.',
          TOAST_VARIANTS.ERROR
        );
      } else {
        const newBranchId = uuid();
        addStoryPart(newBranchId, newBranchName, currentDraftId);
        setCreatingNewBranch(false);
        setChoiceBranchId(newBranchId);
      }
    }
  };

  const handleCancelCreateNewBranchClick = e => {
    e.preventDefault();
    createNewBranchInputEl.current.value = '';
    setCreatingNewBranch(false);
  };

  return (
    <div>
      <p className={styles.label}>Reader Choice</p>
      <p className={styles.subLabel}>
        Text explaining the choice that the reader will make. An example might
        be <i>Try to hide!</i>
      </p>
      <Input ref={choiceTextInputEl} type="text" />
      <div className={styles.branchSelectionContainer}>
        {!creatingNewBranch ? (
          <React.Fragment>
            <BranchSelector
              value={choiceBranchId}
              options={Object.keys(storyParts)
                .filter(key => key !== storyPartId)
                .map(key => ({ value: key, text: storyParts[key].name }))}
              labelText="Which branch should this choice link to?"
              selectInputId="new-choice-next-branch"
              onSelect={handleBranchSelection}
            />
            <div className={styles.buttonContainer}>
              <Button onClick={handleCreateNewBranchClick}>New Branch</Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={styles.newBranchContainer}>
              <p className={styles.label}>New Branch Name</p>
              <Input ref={createNewBranchInputEl} type="text" />
            </div>
            <Inline align="center">
              <Button
                variant={VARIANTS.ACTION}
                onClick={handleSaveNewBranchClick}
              >
                Create Branch
              </Button>
              <Button onClick={handleCancelCreateNewBranchClick}>Cancel</Button>
            </Inline>
          </React.Fragment>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button variant={VARIANTS.ACTION} onClick={handleAddChoiceButtonClick}>
          Add Choice
        </Button>
      </div>
    </div>
  );
};

NewChoiceForm.propTypes = {
  currentDraftId: PropTypes.string.isRequired,
  storyParts: PropTypes.object,
  storyPartId: PropTypes.string.isRequired,
  onAddChoice: PropTypes.func.isRequired,
  addStoryPart: PropTypes.func.isRequired,
};

export default connect(null, { addStoryPart })(NewChoiceForm);
