import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChoiceBuilder.module.css';

const ChoiceBuilder = ({ storyPartKey, storyParts, onSelectNextBranch }) => {
  const nextBranchOptions = Object.keys(storyParts).map(key => (
    <option
      value={key}
      key={key} >
      {key}
    </option>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.selectNextBranch}>
        <p>Select Next Branch:</p>
        <select onChange={onSelectNextBranch}>
          {nextBranchOptions}
        </select>
      </div>
    </div>
  )
}

ChoiceBuilder.propTypes = {
  storyPartKey: PropTypes.string,
  storyParts: PropTypes.object,
  onSelectNextBranch: PropTypes.func,
}

export default ChoiceBuilder;