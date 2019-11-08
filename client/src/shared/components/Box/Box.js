import classNames from 'classnames';
import React from 'react';
import styles from './Box.module.css';

const Box = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Box;
