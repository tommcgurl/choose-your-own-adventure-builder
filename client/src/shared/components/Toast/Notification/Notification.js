import PropTypes from 'prop-types';
import React from 'react';
import { IoMdAlert, IoMdInformationCircleOutline } from 'react-icons/io';
import { VARIANTS } from '../constants';
import styles from './Notification.module.css';

/**
 * This must be a class-based component for ref-forwarding to work with react-spring.
 */
class Notification extends React.Component {
  render() {
    const { children, innerRef, variant, ...rest } = this.props;
    return (
      <div
        className={
          variant === VARIANTS.ERROR
            ? styles.errorContainer
            : styles.infoContainer
        }
        ref={innerRef}
        {...rest}
      >
        <div className={styles.icon}>
          {variant === VARIANTS.ERROR ? (
            <IoMdAlert />
          ) : (
            <IoMdInformationCircleOutline />
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

Notification.propTypes = {
  variant: PropTypes.oneOf(Object.values(VARIANTS)),
};

Notification.defaultProps = {
  variant: VARIANTS.INFORMATIONAL,
};

export default Notification;
