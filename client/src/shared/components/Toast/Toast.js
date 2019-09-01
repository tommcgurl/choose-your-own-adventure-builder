import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from './Toast.module.css';

export const VARIANTS = {
  INFORMATIONAL: 'INFORMATIONAL',
  ERROR: 'ERROR',
};

const Toast = ({ messages }) => {
  useEffect(() => {});
  return <div className={styles.container}>{messages.length}</div>;
};

Toast.defaultProps = {
  messages: [],
};

Toast.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(Object.values(VARIANTS)),
    })
  ),
};

export default Toast;
