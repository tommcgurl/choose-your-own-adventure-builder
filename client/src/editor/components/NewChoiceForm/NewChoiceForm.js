import React, { useRef, useState } from 'react';
import BranchSelector from '../BranchSelector';
import styles from '../ChoiceBuilder/ChoiceBuilder.module.css';

const NewChoiceForm = ({
  currentDraftId,
  storyParts,
  storyPartId,
  onAddChoice,
}) => {
  const choiceTextInputEl = useRef(null);
  // Just pick the first item in the list as the default value.
  // We will pass this to our BranchSelector as well.
  const initialChoiceBranchId = Object.keys(storyParts)[0];
  const [choiceBranchId, setChoiceBranchId] = useState(initialChoiceBranchId);

  const handleBranchSelection = e => {
    setChoiceBranchId(e.target.value);
  };

  const handleAddChoiceButtonClick = () => {
    const choiceText = choiceTextInputEl.current
      ? choiceTextInputEl.current.value
      : '';
    onAddChoice(storyPartId, currentDraftId, choiceText, choiceBranchId);
    choiceTextInputEl.current.value = '';
  };

  return (
    <div className={styles.newChoiceContainer}>
      <p className={styles.label}>Choice Text</p>
      <p className={styles.subLabel}>
        Text explaining the choice. An example choice could be{' '}
        <i className={styles.exampleText}>Try to hide!</i>
      </p>
      <input
        ref={choiceTextInputEl}
        className={styles.newChoiceForm}
        type="text"
      />
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
        <button onClick={handleAddChoiceButtonClick}>Add Choice</button>
      </div>
    </div>
  );
};

export default NewChoiceForm;
