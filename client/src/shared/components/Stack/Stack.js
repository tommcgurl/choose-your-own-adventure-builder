import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import styles from './Stack.module.css';

const Stack = ({ children, align, className, padding, ...rest }) => {
  return (
    <div
      className={classNames(styles.container, styles[align], className)}
      {...rest}
    >
      {Children.toArray(children).map((child, index) => (
        <div key={index} className={styles[padding]}>
          {child}
        </div>
      ))}
    </div>
  );
};

Stack.defaultProps = {
  align: 'justified',
  padding: 'normal',
};

Stack.propTypes = {
  alight: PropTypes.oneOf(['left', 'center', 'right', 'justified']),
  padding: PropTypes.oneOf(['none', 'normal', 'small']),
  children: PropTypes.node.isRequired,
};

export default Stack;
