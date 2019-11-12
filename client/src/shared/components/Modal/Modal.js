import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { animated, useSpring } from 'react-spring';
import eventService from '../../services/eventService';
import Box from '../Box/Box';
import Inline from '../Inline/Inline';
import Stack from '../Stack/Stack';
import {
  CLOSE_MODAL_EVENT,
  defaultOptions,
  OPEN_MODAL_EVENT,
} from './constants';
import * as styles from './Modal.module.css';

const Modal = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    function openModal(content, options) {
      setContent(content);
      setOptions(options);
      setIsOpen(true);
    }
    eventService.subscribe(OPEN_MODAL_EVENT, openModal);
    eventService.subscribe(CLOSE_MODAL_EVENT, closeModal);
    return () => {
      eventService.unsubscribe(OPEN_MODAL_EVENT, openModal);
      eventService.unsubscribe(CLOSE_MODAL_EVENT, closeModal);
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
        <Box>
          <Stack>
            <Inline align="right">
              <button className={styles.closeButton} onClick={closeModal}>
                <IoMdClose style={{ height: '1.5em', width: '1.5em' }} />
              </button>
            </Inline>
            <div className={styles.content}>
              {options.title && (
                <Box component="h1" padding="small">
                  {options.title}
                </Box>
              )}
              <div className={styles.contentBody}>{content}</div>
            </div>
          </Stack>
        </Box>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
