import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

export const VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  ACTION: 'action',
  BORDERLESS: 'borderless',
  ICON: 'icon',
};

const Button = ({ variant = VARIANTS.DEFAULT, ...props }) => {
  return <button className={styles[variant]} {...props} />;
};

Button.propTypes = {
  /**
   * The variant of button to render. This Component exports a
   * VARIANTS constant containing the possible values.
   */
  variant: PropTypes.oneOf([
    VARIANTS.DEFAULT,
    VARIANTS.DESTRUCTIVE,
    VARIANTS.ACTION,
    VARIANTS.BORDERLESS,
    VARIANTS.ICON,
  ]),
};

Button.defaultProps = {
  variant: VARIANTS.DEFAULT,
};

export default Button;
