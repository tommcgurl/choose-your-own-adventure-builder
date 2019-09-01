import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ children, ...rest }) => {
  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  );
};

export default Notification;
