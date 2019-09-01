import React, { useEffect, useRef, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import uuid from 'uuid/v4';
import eventService from '../../services/eventService';
import { POP_TOAST_EVENT } from './constants';
import Notification from './Notification';
import styles from './Toast.module.css';

const AnimatedNotification = animated(Notification);

const Toast = () => {
  const [notifications, setNotifications] = useState([]);
  const refMap = useRef(new WeakMap());

  useEffect(() => {
    function handlePop(content, variant) {
      const notification = { id: uuid(), content, variant };
      setNotifications([...notifications, notification]);
    }
    eventService.subscribe(POP_TOAST_EVENT, handlePop);
    return () => {
      eventService.unsubscribe(POP_TOAST_EVENT, handlePop);
    };
  });

  const transitions = useTransition(notifications, item => item.id, {
    from: { transform: 'translateX(0px)' },
    enter: item => async next => {
      const width = refMap.current.get(item).offsetWidth;
      await next({ transform: `translateX(-${width}px)` });
    },
    leave: { transform: 'translateX(10px)' },
    onRest: item => {
      setTimeout(() => {
        setNotifications(state => state.filter(n => n.id !== item.id));
      }, 2000);
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
          {item.content}
        </AnimatedNotification>
      ))}
    </div>
  );
};

export default Toast;
