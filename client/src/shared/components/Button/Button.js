import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css'

export const TYPES = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  ACTION: 'action',
}

const Button = ({ type = TYPES.DEFAULT, ...props }) => {
  return (
    <button
      className={styles[type]}
      {...props}
    />
  );
}

Button.propTypes = {
  type: PropTypes.oneOf([
    TYPES.DEFAULT,
    TYPES.DESTRUCTIVE,
    TYPES.ACTION
  ])
}

export default Button;