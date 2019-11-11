import React, { Fragment } from 'react';
import PropTypes, { oneOfType, arrayOf } from 'prop-types';
import styles from './Dropdown.module.css';


const Dropdown = ({ id, value, onChange, children, label }) => {
  return (
    <Fragment>
      {label &&
        <label htmlFor={id}>
          {label}
        </label>
      }
      <select
        className={styles.dropdown}
        id={id}
        value={value}
        onChange={onChange}>
        {children}
      </select>
    </Fragment>
  );
}

Dropdown.propTypes = {
  id: oneOfType([PropTypes.string, PropTypes.number]),
  value: oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: arrayOf(PropTypes.element),
  label: PropTypes.string
}

export default Dropdown