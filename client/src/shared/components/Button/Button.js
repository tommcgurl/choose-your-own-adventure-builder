import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userSettingsSelector } from '../../store/selectors';
import styles from './Button.module.css';

export const VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  ACTION: 'action',
  BORDERLESS: 'borderless',
  ICON: 'icon',
};

const Button = ({
  variant = VARIANTS.DEFAULT,
  solid = false,
  nightMode,
  children,
  className,
  ...props
}) => {
  const combinedClassName = classNames(
    styles[variant],
    {
      [styles.solid]: solid || nightMode,
    },
    className
  );
  return (
    <button className={combinedClassName} {...props}>
      <div className={styles.content}>{children}</div>
    </button>
  );
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
  solid: PropTypes.bool,
};

Button.defaultProps = {
  variant: VARIANTS.DEFAULT,
  solid: false,
};

const mapStateToProps = state => {
  return {
    nightMode: userSettingsSelector(state).nightMode,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Button);
