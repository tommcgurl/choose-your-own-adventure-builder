import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import * as styles from './Modal.module.css';
import { animated, useSpring } from 'react-spring';
import { MODAL_SIZES, OPEN_MODAL_EVENT } from './constants';
import eventService from '../../services/eventService';

const Modal = () => {
  const [options, setOptions] = useState({
    clickAwayEnabled: true,
    size: MODAL_SIZES.MEDIUM,
    title: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    function openModal(content, options) {
      setIsOpen(true);
      setContent(content);
      setOptions(state => ({ ...state, ...options }));
    }
    eventService.subscribe(OPEN_MODAL_EVENT, openModal);
    return () => {
      eventService.unsubscribe(OPEN_MODAL_EVENT, openModal);
    };
  });

  const modalElement = useRef(null);
  const modalBackground = useRef(null);

  useEffect(() => {
    if (!options.clickAwayEnabled) {
      return;
    }
    const background = modalBackground.current;
    background.addEventListener('click', handleClickAway);
    return () => {
      background.removeEventListener('click', handleClickAway);
    };
  });

  const handleClickAway = event => {
    if (!modalElement.current.contains(event.target)) {
      closeModal();
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const modalBackgroundSpringStyles = useSpring({
    to: {
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
    },
  });

  const modalSpringStyles = useSpring({
    transform: `translateY(${isOpen ? '' : '-'}15vh)`,
  });

  return (
    <animated.div
      className={styles.modalContainer}
      ref={modalBackground}
      style={modalBackgroundSpringStyles}
    >
      <animated.div
        ref={modalElement}
        className={classNames(styles[options.size], styles.modal)}
        style={modalSpringStyles}
      >
        <div className={styles.top}>
          <button className={styles.closeButton} onClick={closeModal}>
            <IoMdClose />
          </button>
        </div>
        <div className={styles.content}>
          {options.title && <h1>{options.title}</h1>}
          <div style={{ padding: '4px' }}>{content}</div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
