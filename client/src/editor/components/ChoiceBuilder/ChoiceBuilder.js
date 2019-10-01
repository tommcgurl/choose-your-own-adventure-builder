import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { connect } from 'react-redux';
import Button, { VARIANTS } from '../../../shared/components/Button';
import { closeModal } from '../../../shared/components/Modal';
import {
  addChoiceToStoryPart,
  changePromptText,
  removeChoiceFromStoryPart,
} from '../../store/actions/draftActions';
import { storyPartsSelector } from '../../store/selectors';
import NewChoiceForm from '../NewChoiceForm';
import styles from './ChoiceBuilder.module.css';

const ChoiceBuilder = ({
  getStoryParts,
  storyPartKey,
  draftId,
  addChoiceToStoryPart,
  removeChoiceFromStoryPart,
  changePromptText,
}) => {
  const storyParts = getStoryParts(draftId);
  console.log(storyParts);
  const currentStoryPart = storyParts[storyPartKey];

  const choices =
    currentStoryPart && currentStoryPart.prompt
      ? currentStoryPart.prompt.choices
      : [];

  const [editingPromptText, setEditingPromptText] = useState(false);
  const promptTextInputRef = useRef(null);

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

  const handleAddStoryPart = (...args) => {
    closeModal();
    addChoiceToStoryPart(...args);
  };

  return (
    <div className={styles.container}>
      <div className={styles.promptInputContainer}>
        <div className={styles.promptStoryTextContainer}>
          <h2 className={styles.header1}>Current story part text</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: draftToHtml(currentStoryPart.plot),
            }}
          />
        </div>
        <h2 className={styles.header1}>Current Choices</h2>
        {choices.length > 0 && (
          <ul className={styles.existingChoicesList}>
            {choices.map(({ text, nextBranch: choiceBranchId }) => (
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
                  <p className={styles.choiceInfoValue}>
                    {storyParts[choiceBranchId].name}
                  </p>
                </div>
                <Button
                  onClick={handleRemoveChoiceFromStoryPartClick.bind(
                    null,
                    text
                  )}
                  variant={VARIANTS.DESTRUCTIVE}
                >
                  <IoMdTrash />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.newPromptContainer}>
          <p className={styles.label}>Prompt Text</p>
          <p className={styles.subLabel}>
            This should be a prompt for the user to take action, and select from
            a list of choices. This text will remain the same for each choice
            you add. An example prompt could be{' '}
            <i className="example-text">
              The monster is approaching, do you want to climb the ladder, or
              try to hide?
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
                <React.Fragment>
                  {currentStoryPart.prompt && currentStoryPart.prompt.text ? (
                    <React.Fragment>
                      Current Prompt Text: <i>{currentStoryPart.prompt.text}</i>
                    </React.Fragment>
                  ) : (
                    'Prompt text has not yet been set.'
                  )}
                </React.Fragment>
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
                onAddChoice={handleAddStoryPart}
              />
            }
          </form>
        </div>
      </div>
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
  }
)(ChoiceBuilder);
