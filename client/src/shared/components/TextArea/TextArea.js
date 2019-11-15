import React from 'react';
import styles from './TextArea.module.css';
import classNames from 'classnames';

const TextArea = ({ className, ...rest }) => {
  return (
    <textarea className={classNames(styles.container, className)} {...rest} />
  );
};

export default TextArea;
