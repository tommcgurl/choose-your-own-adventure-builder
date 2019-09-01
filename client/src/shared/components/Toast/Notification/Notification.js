import PropTypes from 'prop-types';
import React from 'react';
import { IoMdAlert, IoMdInformationCircleOutline } from 'react-icons/io';
import { TOAST_VARIANTS } from '../constants';
import styles from './Notification.module.css';

const Notification = ({ children, innerRef, variant, ...rest }) => {
  return (
    <div
      className={
        variant === TOAST_VARIANTS.ERROR
          ? styles.errorContainer
          : styles.infoContainer
      }
      ref={innerRef}
      {...rest}
    >
      <div className={styles.icon}>
        {variant === TOAST_VARIANTS.ERROR ? (
          <IoMdAlert />
        ) : (
          <IoMdInformationCircleOutline />
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

Notification.propTypes = {
  variant: PropTypes.oneOf(Object.values(TOAST_VARIANTS)),
};

Notification.defaultProps = {
  variant: TOAST_VARIANTS.INFO,
};

export default Notification;
