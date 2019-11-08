import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import styles from './Stack.module.css';

const Stack = ({ children, align }) => {
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

Stack.defaultProps = {
  align: 'left',
};

Stack.propTypes = {
  alight: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node.isRequired,
};

export default Stack;
