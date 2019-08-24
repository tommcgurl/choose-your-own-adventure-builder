import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ isOpen, closeModal, children }) => {
  const style = isOpen ? null : { display: 'none' };
  return (
    <div id="modal" style={style} className={styles.modalContainer}>
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
};

Modal.defaultProps = {
  isOpen: false,
  closeModal: () => {
    document.getElementById('modal').style = { display: 'none' };
  },
  children: null,
};

export default Modal;
