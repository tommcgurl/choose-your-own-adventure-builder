import React from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
  return (
    <div className={styles.modalContainer}>
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

export default Modal;
