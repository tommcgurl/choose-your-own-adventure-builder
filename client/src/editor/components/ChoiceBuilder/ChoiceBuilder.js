import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import BranchSelector from '../BranchSelector';
import styles from './ChoiceBuilder.module.css';

const NewChoiceForm = ({ storyParts }) => {
  return (
    <div className={styles.newChoiceContainer}>
      <div className="App-flex-column App-flex-1">
        <p className="textarea-label">Choice Text</p>
        <p className="textarea-sub-label">
          Text explaining the choice. An example choice could be{' '}
          <i className={styles.exampleText}>Try to hide!</i>
        </p>
        <input className={styles.newChoiceForm} type="text" />
      </div>
      <BranchSelector
        options={Object.keys(storyParts)}
        labelText="Which branch should this choice link to?"
        selectInputId="new-choice-next-branch"
        onSelect={() => { }}
      />
    </div>
  );
};

const ChoiceBuilder = ({ storyPartKey, storyParts, onSelectNextBranch }) => {

  const currentStoryPart = storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const [showPromptInput, setShowPromptInput] = useState(!!choices.length);

  function handleAddPromptButtonClick() {
    setShowPromptInput(true);
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
        <p>{text}</p>
      </div>
      <div className={styles.choiceInfo}>
        <p className={styles.choiceInfoLabel}>Next Branch</p>
        <p>{nextBranch}</p>
      </div>
    </li>
  ));

  const promptInput = (
    <div className={styles.promptInputContainer}>
      <ul className={styles.existingChoicesList}>
        {exitingChoices}
      </ul>
      <p className="textarea-label">Prompt Text</p>
      <p className="textarea-sub-label">
        This should be a prompt for the user to take action, and select from a
        list of choices. An example prompt could be{' '}
        <i className="example-text">
          The monster is approaching, do you want to climb the ladder, or try to
          hide?
        </i>
      </p>
      <input className={styles.promptInput} type="text" />
      {<NewChoiceForm storyParts={storyParts} />}
      {/* <div className="story-parts-add-choice-button-container">
        <a
          onClick={this.onClickAddChoice}
          className="App-button" >
          Add Choice
            </a>
      </div> */}
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
};

export default ChoiceBuilder;
