import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import eventManager from '../../services/eventManager';
import uuid from 'uuid/v4';
import Notification from './Notification';

export const VARIANTS = {
  INFORMATIONAL: 'INFORMATIONAL',
  ERROR: 'ERROR',
};

export const toast = message => {
  eventManager.emit('pop', message);
};

const Toast = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    function handlePop(message) {
      const notification = { id: uuid(), message };
      setNotifications([...notifications, notification]);
    }
    eventManager.on('pop', handlePop);
    return () => {
      eventManager.off('pop', handlePop);
    };
  });

  function handleNotificationComplete(id) {
    setNotifications(notifications.filter(n => n.id !== id));
  }

  return (
    <div className={styles.container}>
      {notifications.map(notification => (
        <Notification key={notification.id}>
          {notification.message}
        </Notification>
      ))}
    </div>
  );
};

export default Toast;
