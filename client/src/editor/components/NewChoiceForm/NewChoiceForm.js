import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
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
    onAddChoice(
      storyPartId,
      currentDraftId,
      choiceText,
      choiceBranchId,
      storyParts[choiceBranchId].name
    );
    choiceTextInputEl.current.value = '';
  };

  const handleCreateNewBranchClick = e => {
    e.preventDefault();
    setCreatingNewBranch(true);
  };

  const handleSaveNewBranchClick = e => {
    e.preventDefault();
    const newBranchName = createNewBranchInputEl.current
      ? createNewBranchInputEl.current.value
      : '';
    addStoryPart(newBranchName, currentDraftId);
    setCreatingNewBranch(false);
  };

  const handleCancelCreateNewBranchClick = e => {
    e.preventDefault();
    createNewBranchInputEl.current.value = '';
    setCreatingNewBranch(false);
  };

  return (
    <div>
      <p className={styles.label}>Choice Text</p>
      <p className={styles.subLabel}>
        Text explaining the choice. An example choice could be{' '}
        <i>Try to hide!</i>
      </p>
      <input ref={choiceTextInputEl} type="text" />
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
              <input ref={createNewBranchInputEl} type="text" />
            </div>
            <div className={styles.buttonContainer}>
              <span className={styles.newBranchButtonWrapper}>
                <Button
                  variant={VARIANTS.ACTION}
                  onClick={handleSaveNewBranchClick}
                >
                  Create Branch
                </Button>
              </span>
              <span className={styles.newBranchButtonWrapper}>
                <Button onClick={handleCancelCreateNewBranchClick}>
                  Cancel
                </Button>
              </span>
            </div>
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

export default connect(
  null,
  { addStoryPart }
)(NewChoiceForm);
