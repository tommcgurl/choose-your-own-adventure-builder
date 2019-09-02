import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import * as styles from './Modal.module.css';

export const sizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

const Modal = ({
  isOpen,
  closeModal,
  children,
  clickAwayEnabled,
  size,
  title,
}) => {
  const modalElement = useRef(null);
  const modalBackground = useRef(null);

  useEffect(() => {
    if (!clickAwayEnabled) {
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

  const modalClassNames = classNames(styles[size], styles.modal, {
    [styles.slideInModal]: isOpen,
    [styles.slideOutModal]: !isOpen,
  });

  return (
    <div
      className={isOpen ? styles.showModal : styles.modalContainer}
      ref={modalBackground}
    >
      <div ref={modalElement} className={modalClassNames}>
        <div className={styles.top}>
          <button className={styles.closeButton} onClick={closeModal}>
            <IoMdClose />
          </button>
        </div>
        <div className={styles.content}>
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /**
   * A boolean that tells the modal whether it should be open.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * A function that handles closing the modal.
   */
  closeModal: PropTypes.func.isRequired,
  /**
   * The child components to be rendered inside of the modal.
   */
  children: PropTypes.node,
  /**
   * Whether or not clicking away from the modal conent should
   * close the modal.
   */
  clickAwayEnabled: PropTypes.bool,
  /**
   * The size of the modal you want to be rendered. Large is
   * 80vw, medium is 50vw, and small is 30vw.
   */
  size: PropTypes.oneOf([sizes.SMALL, sizes.MEDIUM, sizes.LARGE]),
  title: PropTypes.string,
};

Modal.defaultProps = {
  isOpen: true,
  children: null,
  clickAwayEnabled: true,
  size: sizes.MEDIUM,
};

export default Modal;
