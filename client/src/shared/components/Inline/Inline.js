import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import styles from './Inline.module.css';

const Inline = ({ children, align }) => {
  return (
    <div className={classNames(styles.container, styles[align])}>
      {Children.map(children, child =>
        child !== null && child !== undefined ? (
          <div className={styles.child}>{child}</div>
        ) : null
      )}
    </div>
  );
};

Inline.defaultProps = {
  align: 'left',
};

Inline.propTypes = {
  alight: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node.isRequired,
};

export default Inline;
