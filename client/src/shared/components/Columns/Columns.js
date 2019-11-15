import classNames from 'classnames';
import React from 'react';
import styles from './Columns.module.css';

const Columns = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Columns;
