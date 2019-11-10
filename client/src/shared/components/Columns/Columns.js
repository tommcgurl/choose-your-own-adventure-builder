import React from 'react';
import styles from './Columns.module.css';

const Columns = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Columns;
