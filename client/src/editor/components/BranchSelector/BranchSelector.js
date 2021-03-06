import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from '../../../shared/components';
import styles from './BranchSelector.module.css';

const BranchSelector = ({
  options,
  labelText,
  selectInputId,
  onSelect,
  value,
}) => {
  const optionsList = options.map(option => (
    <option value={option.value} key={option.value}>
      {option.text}
    </option>
  ));

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={selectInputId}>
        {labelText}
        <Dropdown
          value={value}
          id={selectInputId}
          onChange={onSelect}
        >
          {optionsList}
        </Dropdown>
      </label>
    </div>
  );
};

BranchSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, text: PropTypes.string })
  ).isRequired,
  labelText: PropTypes.string.isRequired,
  selectInputId: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default React.memo(BranchSelector);
