import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as styles from './Modal.module.css';

export const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const Modal = ({ isOpen, closeModal, children, clickAwayEnabled, size }) => {
  const modalElement = useRef(null);
  const handleClickAway = event => {
    if (!modalElement.current.contains(event.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    if (!clickAwayEnabled) {
      return;
    }
    const modal = document.getElementById('modal');
    modal.addEventListener('click', handleClickAway);
    return () => {
      modal.removeEventListener('click', handleClickAway);
    };
  });
  const modalStyle = isOpen ? styles.showModal : styles.modalContainer;
  const modalContentStyle = isOpen
    ? styles.slideInModalContent
    : styles.modalContent;
  return (
    <div id="modal" className={modalStyle}>
      <div
        ref={modalElement}
        className={`${modalContentStyle} ${styles[size]}`}
      >
        <span className={styles.close}>
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
        </span>
        {children}
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
  size: PropTypes.oneOf([SIZES.sm, SIZES.md, SIZES.lg]),
};

Modal.defaultProps = {
  isOpen: false,
  closeModal: () => {
    document.getElementById('modal').style = { display: 'none' };
  },
  children: null,
  clickAwayEnabled: true,
  size: SIZES.md,
};

export default Modal;
