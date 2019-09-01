import React, { useRef, useState } from 'react';
import Button, { VARIANTS } from '../../../shared/components/Button';
import BranchSelector from '../BranchSelector';
import styles from './NewChoiceForm.module.css';

const NewChoiceForm = ({
  currentDraftId,
  storyParts,
  storyPartId,
  onAddChoice,
}) => {
  const choiceTextInputEl = useRef(null);
  // Just pick the first item in the list as the default value.
  // We will pass this to our BranchSelector as well.
  const initialChoiceBranchId = Object.keys(storyParts).filter(
    key => key !== storyPartId
  )[0];
  const [choiceBranchId, setChoiceBranchId] = useState(initialChoiceBranchId);

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

  return (
    <div>
      <p className={styles.label}>Choice Text</p>
      <p className={styles.subLabel}>
        Text explaining the choice. An example choice could be{' '}
        <i>Try to hide!</i>
      </p>
      <input ref={choiceTextInputEl} type="text" />
      <div className={styles.branchSelectionContainer}>
        <BranchSelector
          value={choiceBranchId}
          options={Object.keys(storyParts)
            .filter(key => key !== storyPartId)
            .map(key => ({ value: key, text: storyParts[key].name }))}
          labelText="Which branch should this choice link to?"
          selectInputId="new-choice-next-branch"
          onSelect={handleBranchSelection}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant={VARIANTS.ACTION} onClick={handleAddChoiceButtonClick}>
          Add Choice
        </Button>
      </div>
    </div>
  );
};

export default NewChoiceForm;
