import classNames from 'classnames';
import React from 'react';
import styles from './Select.module.css';

const Select = ({ children, className, ...rest }) => {
  return (
    <select className={classNames(styles.container, className)} {...rest}>
      {children}
    </select>
  );
};

export default Select;
