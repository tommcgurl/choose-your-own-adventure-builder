import React from 'react';
import PropTypes from 'prop-types';
import styles from './BranchSelector.module.css';

const BranchSelector = ({options, labelText, selectInputId, onSelect}) => {
  const optionsList = (
    options.map(option => (
      <option
        value={option}
        key={option}>
        {option}
      </option>
    ))
  );

  return (
    <div className={styles.selectNextBranch}>
      <label htmlFor={selectInputId}>
        {labelText}
        <select
          id={selectInputId}
          onChange={onSelect}>
          {optionsList}
        </select>
      </label>
    </div>
  );
}

BranchSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelText: PropTypes.string.isRequired,
  selectInputId: PropTypes.string.isRequired,
};

export default React.memo(BranchSelector);