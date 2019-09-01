import React, { useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ children, onHideComplete }) => {
  // const [show, setShow] = useState(false);

  useEffect(() => {
    // const showTimeout = setTimeout(() => {
    //   setShow(true);
    // }, 0);

    // const hideTimeout = setTimeout(() => {
    //   setShow(false);
    // }, 1000);

    const hideCompleteTimeout = setTimeout(() => {
      // onHideComplete();
    }, 1250);

    return () => {
      // clearTimeout(showTimeout);
      // clearTimeout(hideTimeout);
      clearTimeout(hideCompleteTimeout);
    };
  });

  return <div className={styles.container}>{children}</div>;
};

export default Notification;
