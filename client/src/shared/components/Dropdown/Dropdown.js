import classNames from 'classnames';
import PropTypes, { oneOfType } from 'prop-types';
import React, { Fragment } from 'react';
import uuid from 'uuid/v4';
import styles from './Dropdown.module.css';

const Dropdown = ({
  id,
  value,
  onChange,
  children,
  label,
  className,
  ...rest
}) => {
  id = label && (id || uuid());
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
  children: PropTypes.node,
  label: PropTypes.string,
};

export default Dropdown;
