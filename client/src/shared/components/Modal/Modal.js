import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ isOpen, closeModal, content, clickAwayEnabled }) => {
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
      <div ref={modalElement} className={modalContentStyle}>
        <span className={styles.close}>
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
        </span>
        {content}
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
  closeModal: PropTypes.func,
  /**
   * The child components to be rendered inside of the modal.
   */
  children: PropTypes.node,
  /**
   * Whether or not clicking away from the modal conent should
   * close the modal.
   */
  clickAwayEnabled: PropTypes.bool,
};

Modal.defaultProps = {
  isOpen: false,
  closeModal: () => {
    document.getElementById('modal').style = { display: 'none' };
  },
  children: null,
  clickAwayEnabled: true,
};

export default Modal;
