import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import BranchSelector from '../BranchSelector';
import styles from './ChoiceBuilder.module.css';

const ChoiceBuilder = ({ storyPartKey, storyParts, onSelectNextBranch }) => {

  const [showPromptInput, setShowPromptInput] = useState(false)
  const nextBranchOptions = Object.keys(storyParts).map(key => (
    <option
      value={key}
      key={key} >
      {key}
    </option>
  ));

  function handleAddPromptButtonClick() {
    setShowPromptInput(true);
  }

  const addPromptButton = (
    <button
      className={styles.addPromptButton}
      onClick={handleAddPromptButtonClick}>
      Add User Choices
    </button>
  );

  const promptInput = (
    <div className={styles.promptInput}>
      <label htmlFor="new-choice">
        Choice Text
        <input type="text" id="new-choice"></input>
      </label>
      <BranchSelector
        options={Object.keys(storyParts)}
        labelText="Which branch should this choice link to?"
        selectInputId="new-choice-next-branch"
        onSelect={() => {}}
      />
      <button>Add</button>
    </div>
  )

  return (
    <div className={styles.container}>
      {!showPromptInput &&
        <Fragment>
          <BranchSelector
            options={Object.keys(storyParts)}
            labelText="Select next branch"
            selectInputId="no-choice-next-branch"
            onSelect={onSelectNextBranch}
          />
          Or
        </Fragment>
      }
      {!showPromptInput && addPromptButton}
      {showPromptInput && promptInput}
    </div>
  )
}

ChoiceBuilder.propTypes = {
  storyPartKey: PropTypes.string,
  storyParts: PropTypes.object,
  onSelectNextBranch: PropTypes.func,
}

export default ChoiceBuilder;