import React, { Fragment } from 'react';
import PropTypes, { oneOfType, arrayOf } from 'prop-types';
import styles from './Dropdown.module.css';
import classNames from 'classnames';

const Dropdown = ({
  id,
  value,
  onChange,
  children,
  label,
  className,
  ...rest
}) => {
  return (
    <Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={classNames(styles.dropdown, className)}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {children}
      </select>
    </Fragment>
  );
};

Dropdown.propTypes = {
  id: oneOfType([PropTypes.string, PropTypes.number]),
  value: oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: arrayOf(PropTypes.element),
  label: PropTypes.string,
};

export default Dropdown;
