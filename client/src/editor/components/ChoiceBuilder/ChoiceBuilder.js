import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import BranchSelector from '../BranchSelector';
import styles from './ChoiceBuilder.module.css';

const NewChoiceForm = ({ storyParts }) => {
  return (
    <div className={styles.newChoiceContainer}>
      <p className={styles.label}>Choice Text</p>
      <p className={styles.subLabel}>
        Text explaining the choice. An example choice could be{' '}
        <i className={styles.exampleText}>Try to hide!</i>
      </p>
      <input className={styles.newChoiceForm} type="text" />
      <div className={styles.branchSelectionContainer}>
        <BranchSelector
          options={Object.keys(storyParts)}
          labelText="Which branch should this choice link to?"
          selectInputId="new-choice-next-branch"
          onSelect={() => { }}
        />
      </div>
    </div>
  );
};

const ChoiceBuilder = ({ storyPartKey, storyParts, onSelectNextBranch, onAddChoice }) => {

  const currentStoryPart = storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const [showPromptInput, setShowPromptInput] = useState(!!choices.length);

  function handleAddPromptButtonClick() {
    setShowPromptInput(true);
  }

  function handleAddChoiceButtonClick() {
    // onAddChoice
  }

  const addPromptButton = (
    <button
      className={styles.addPromptButton}
      onClick={handleAddPromptButtonClick}
    >
      Add User Choices
    </button>
  );

  const exitingChoices = choices.map(({ text, nextBranch }) => (
    <li
      className={styles.choice}
      key={text} >
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
          clipRule="evenodd">
          <path d="M21.9 12l-7.5 6.2.6.8 9-7.5L15 4l-.6.8 7.5 6.2H0v1h21.9z" />
        </svg>
      </div>
      <div className={styles.choiceInfo}>
        <p className={styles.choiceInfoLabel}>Next Branch</p>
        <p className={styles.choiceInfoValue}>{nextBranch}</p>
      </div>
    </li>
  ));

  const promptInput = (
    <div className={styles.promptInputContainer}>
      <ul className={styles.existingChoicesList}>
        {exitingChoices}
      </ul>
      <div className={styles.newPromptContainer}>
        <p className={styles.label}>Prompt Text</p>
        <p className={styles.subLabel}>
          This should be a prompt for the user to take action, and select from a
        list of choices. An example prompt could be{' '}
          <i className="example-text">
            The monster is approaching, do you want to climb the ladder, or try to
            hide?
        </i>
        </p>
        <input className={styles.promptInput} type="text" />
        {<NewChoiceForm storyParts={storyParts} />}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleAddChoiceButtonClick}
          >
            Add Choice
        </button>
        </div>

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
};

export default ChoiceBuilder;
