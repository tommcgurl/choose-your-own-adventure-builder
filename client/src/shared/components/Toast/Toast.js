import React, { useCallback, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import uuid from 'uuid/v4';
import eventManager from '../../services/eventManager';
import Notification from './Notification';
import styles from './Toast.module.css';

const AnimatedNotification = animated(Notification);

export const VARIANTS = {
  INFORMATIONAL: 'INFORMATIONAL',
  ERROR: 'ERROR',
};

export const toast = message => {
  eventManager.emit('pop', message);
};

const Toast = ({
  // config = { tension: 125, friction: 20, precision: 0.1 },
  delay = 2000,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [timeouts, setTimeouts] = useState([]);
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

  const cleanupTimeouts = useCallback(() => {
    timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
  }, [timeouts]);

  useEffect(() => {
    return cleanupTimeouts;
  }, []);

  const transitions = useTransition(notifications, item => item.id, {
    from: { opacity: 0 },
    enter: item => async next => await next({ opacity: 1 }),
    leave: item => async (next, cancel) => {
      await next({ opacity: 0 });
    },
    onRest: item => {
      const timeout = setTimeout(() => {
        setNotifications(state => state.filter(n => n.id !== item.id));
      }, delay);
      setTimeouts([...timeouts, timeout]);
    },
    // config: (item, state) =>
    //   state === 'leave' ? [{ duration: delay }, config, config] : config,
  });

  return (
    <div className={styles.container}>
      {transitions.map(({ key, item, props }) => (
        <AnimatedNotification key={key} style={props}>
          {item.message}
        </AnimatedNotification>
      ))}
    </div>
  );
};

export default Toast;
