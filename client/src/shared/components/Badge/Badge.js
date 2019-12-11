import React from 'react';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import styles from './Badge.module.css';

/**
 * A simple badge component used to display information such 
 * as the genre that a story belongs to, or some tags.
 */
const Badge = ({ dismissable = false, onClickDismiss, children }) => {
  const handleClickDismiss = () => {
    typeof (onClickDismiss) === 'function' && onClickDismiss();
  }

  return (
    <div className={styles.container}>
      {children}
      {dismissable &&
        <span
          onClick={handleClickDismiss}
          className={styles.dismissButtonContainer} >
          <IoIosClose className={styles.dismissButton} />
        </span>
      }
    </div>
  )
}

Badge.propTypes = {
  /**
   * Whether or not this component should have a dismiss button.
   */
  dismissable: PropTypes.bool,
  /**
   * Function to be called when the dismiss button is clicked. Use
   * this to perform an operation such as removing the badge.
   */
  onClickDismiss: PropTypes.func,
}

Badge.defaultProps = {
  dismissable: false,
}


export default Badge;
