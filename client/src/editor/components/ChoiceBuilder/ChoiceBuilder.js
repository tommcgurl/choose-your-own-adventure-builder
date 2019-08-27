import PropTypes from 'prop-types';
import React, { Fragment, useRef, useState } from 'react';
import BranchSelector from '../BranchSelector';
import styles from './ChoiceBuilder.module.css';

const NewChoiceForm = ({ storyParts, onAddChoice }) => {
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
    onAddChoice({ choiceText, choiceBranchId });
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
          options={Object.keys(storyParts)}
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

const ChoiceBuilder = ({
  storyPartKey,
  storyParts,
  onSelectNextBranch,
  onAddChoice,
  onRemoveChoice,
}) => {
  const currentStoryPart = storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const [showPromptInput, setShowPromptInput] = useState(!!choices.length);
  const promptTextInputRef = useRef(null);

  const handleAddPromptButtonClick = () => {
    setShowPromptInput(true);
  };

  const handlePromptTextChange = () => {
    currentStoryPart.prompt.text = promptTextInputRef.current.value;
  }

  const addPromptButton = (
    <button
      className={styles.addPromptButton}
      onClick={handleAddPromptButtonClick}
    >
      Add User Choices
    </button>
  );

  const existingChoices = choices.map(({ text, nextBranch }) => (
    <li className={styles.choice} key={text}>
      <div className={styles.choiceInfo}>
        <p className={styles.choiceInfoLabel}>Choice Text</p>
        <p className={styles.choiceInfoValue}>{text}</p>
      </div>
      <div className={styles.arrow}>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M21.9 12l-7.5 6.2.6.8 9-7.5L15 4l-.6.8 7.5 6.2H0v1h21.9z" />
        </svg>
      </div>
      <div className={styles.choiceInfo}>
        <p className={styles.choiceInfoLabel}>Next Branch</p>
        <p className={styles.choiceInfoValue}>{nextBranch}</p>
      </div>
      <button
        onClick={onRemoveChoice.bind(null, text)}
        className={styles.removeChoiceButton}
      >
        ⅹ
      </button>
    </li>
  ));

  const promptInput = (
    <div className={styles.promptInputContainer}>
      {currentStoryPart.prompt &&
        <div>
          <p>Current prompt text: <br /><i>{currentStoryPart.prompt.text}</i></p>
        </div>}
      <ul className={styles.existingChoicesList}>{existingChoices}</ul>
      <div className={styles.newPromptContainer}>
        <p className={styles.label}>Prompt Text</p>
        <p className={styles.subLabel}>
          This should be a prompt for the user to take action, and select from a
          list of choices. An example prompt could be{' '}
          <i className="example-text">
            The monster is approaching, do you want to climb the ladder, or try
            to hide?
          </i>
        </p>
        <input ref={promptTextInputRef} className={styles.promptInput} type="text" onChange={handlePromptTextChange} />
        {<NewChoiceForm storyParts={storyParts} onAddChoice={onAddChoice} />}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {!showPromptInput && (
        <Fragment>
          <BranchSelector
            options={Object.keys(storyParts)}
            labelText="Select next branch"
            selectInputId="no-choice-next-branch"
            onSelect={onSelectNextBranch}
            value={currentStoryPart.nextBranchId}
          />
          Or
        </Fragment>
      )}
      {!showPromptInput && addPromptButton}
      {showPromptInput && promptInput}
    </div>
  );
};

ChoiceBuilder.propTypes = {
  storyPartKey: PropTypes.string,
  storyParts: PropTypes.object,
  onSelectNextBranch: PropTypes.func,
  onAddChoice: PropTypes.func,
  onRemoveChoice: PropTypes.func,
};

export default ChoiceBuilder;
