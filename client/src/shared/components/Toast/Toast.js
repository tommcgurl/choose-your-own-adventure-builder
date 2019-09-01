import React, { useCallback, useEffect, useRef, useState } from 'react';
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

export const popToast = (message, variant) => {
  eventManager.emit('pop', message, variant);
};

const Toast = () => {
  const [notifications, setNotifications] = useState([]);
  const [timeouts, setTimeouts] = useState([]);
  const refMap = useRef(new WeakMap());

  useEffect(() => {
    function handlePop(message, variant) {
      const notification = { id: uuid(), message, variant };
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
    from: { transform: 'translateX(0px)' },
    enter: item => async next => {
      const width = refMap.current.get(item).offsetWidth;
      await next({ transform: `translateX(-${width}px)` });
    },
    leave: item => async (next, cancel) => {
      await next({ transform: 'translateX(10px)' });
    },
    onRest: item => {
      const timeout = setTimeout(() => {
        setNotifications(state => state.filter(n => n.id !== item.id));
      }, 2000);
      setTimeouts([...timeouts, timeout]);
    },
  });

  return (
    <div className={styles.container}>
      {transitions.map(({ key, item, props }) => (
        <AnimatedNotification
          key={key}
          style={props}
          innerRef={ref => ref && refMap.current.set(item, ref)}
          variant={item.variant}
        >
          {item.message}
        </AnimatedNotification>
      ))}
    </div>
  );
};

export default Toast;
