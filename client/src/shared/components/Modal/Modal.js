import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
  return (
    <div id="modal" className={styles.modalContainer}>
      <div className={styles.modalContent}>
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
   * A function that handles closing the modal.
   */
  closeModal: PropTypes.func.isRequired,
  /**
   * The child components to be rendered inside of the modal.
   */
  children: PropTypes.node,
};

Modal.defaultProps = {
  closeModal: () => {
    document.getElementById('modal').style.display = 'none';
  },
};

export default Modal;
