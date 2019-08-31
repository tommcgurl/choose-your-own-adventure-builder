import PropTypes from 'prop-types';
import React, { Fragment, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Button, { VARIANTS } from '../../../shared/components/Button';
import {
  addChoiceToStoryPart,
  changePromptText,
  removeChoiceFromStoryPart,
  selectStoryPartNextBranchId,
} from '../../store/actions/draftActions';
import { storyPartsSelector } from '../../store/selectors';
import BranchSelector from '../BranchSelector';
import NewChoiceForm from '../NewChoiceForm';
import styles from './ChoiceBuilder.module.css';

const ChoiceBuilder = ({
  getStoryParts,
  storyPartKey,
  draftId,
  addChoiceToStoryPart,
  removeChoiceFromStoryPart,
  changePromptText,
  selectStoryPartNextBranchId,
}) => {
  const storyParts = getStoryParts(draftId);
  const currentStoryPart = storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const [showPromptInput, setShowPromptInput] = useState(!!choices.length);
  const [editingPromptText, setEditingPromptText] = useState(false);
  const promptTextInputRef = useRef(null);

  const handleAddPromptButtonClick = () => {
    setShowPromptInput(true);
  };

  const handlePromptEditClick = e => {
    e.preventDefault();
    if (editingPromptText) {
      changePromptText(storyPartKey, draftId, promptTextInputRef.current.value);
      setEditingPromptText(false);
    }
    if (!editingPromptText) {
      setEditingPromptText(true);
    }
  };

  const handleRemoveChoiceFromStoryPartClick = text => {
    removeChoiceFromStoryPart(storyPartKey, draftId, text);
  };

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
        onClick={handleRemoveChoiceFromStoryPartClick.bind(null, text)}
        className={styles.removeChoiceButton}
      >
        ⅹ
      </button>
    </li>
  ));

  const promptInput = (
    <div className={styles.promptInputContainer}>
      <h2 className={styles.currentChoices}>Current Choices</h2>
      <ul className={styles.existingChoicesList}>{existingChoices}</ul>
      <div className={styles.newPromptContainer}>
        <p className={styles.label}>Prompt Text</p>
        <p className={styles.subLabel}>
          This should be a prompt for the user to take action, and select from a
          list of choices. This text will remain the same for each choice you
          add. An example prompt could be{' '}
          <i className="example-text">
            The monster is approaching, do you want to climb the ladder, or try
            to hide?
          </i>
        </p>
        <form>
          <p>
            {editingPromptText ? (
              <input
                ref={promptTextInputRef}
                className={styles.promptInput}
                type="text"
                defaultValue={
                  (currentStoryPart.prompt && currentStoryPart.prompt.text) ||
                  ''
                }
              />
            ) : (
              <i>
                {currentStoryPart.prompt && currentStoryPart.prompt.text
                  ? `Current prompt text: ${currentStoryPart.prompt.text}`
                  : 'Prompt text has not yet been set.'}
              </i>
            )}
          </p>
          <Button
            variant={editingPromptText ? VARIANTS.ACTION : VARIANTS.DEFAULT}
            onClick={handlePromptEditClick}
          >
            {editingPromptText ? 'Save Prompt Text' : 'Edit Prompt Text'}
          </Button>
          {
            <NewChoiceForm
              currentDraftId={draftId}
              storyPartId={storyPartKey}
              storyParts={storyParts}
              onAddChoice={addChoiceToStoryPart}
            />
          }
        </form>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {!showPromptInput && (
        <Fragment>
          <BranchSelector
            options={Object.keys(storyParts)
              .filter(key => key !== storyPartKey)
              .map(key => ({
                value: key,
                text: storyParts[key].name,
              }))}
            labelText="Select next branch"
            selectInputId="no-choice-next-branch"
            onSelect={selectStoryPartNextBranchId}
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
};

const mapStateToProps = state => {
  return {
    getStoryParts: id => storyPartsSelector(state)(id),
  };
};

export default connect(
  mapStateToProps,
  {
    addChoiceToStoryPart,
    changePromptText,
    removeChoiceFromStoryPart,
    selectStoryPartNextBranchId,
  }
)(ChoiceBuilder);
