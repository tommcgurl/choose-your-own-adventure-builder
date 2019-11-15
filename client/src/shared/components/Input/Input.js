import classNames from 'classnames';
import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(styles.container, className)}
      {...rest}
    />
  );
});

export default Input;
