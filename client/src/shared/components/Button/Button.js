import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

export const VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  ACTION: 'action',
}

const Button = ({ variant = VARIANTS.DEFAULT, ...props }) => {
  return (
    <button
      className={styles[variant]}
      {...props}
    />
  );
}

Button.propTypes = {
  /**
   * The variant of button to render. This Component exports a 
   * VARIANTS constant containing the possible values.
   */
  type: PropTypes.oneOf([
    VARIANTS.DEFAULT,
    VARIANTS.DESTRUCTIVE,
    VARIANTS.ACTION
  ])
}

Button.defaultProps = {
  type: VARIANTS.DEFAULT
}

export default Button;