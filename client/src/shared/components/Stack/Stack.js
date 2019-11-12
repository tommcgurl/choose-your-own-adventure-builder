import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children, forwardRef } from 'react';
import styles from './Stack.module.css';

const Stack = forwardRef(
  ({ children, align, className, padding, divider, ...rest }, ref) => {
    return (
      <div
        className={classNames(styles.container, className)}
        {...rest}
        ref={ref}
      >
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            className={classNames(styles[padding], styles[align], {
              [styles.divider]: divider,
            })}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);

Stack.defaultProps = {
  align: 'left',
  padding: 'normal',
  divider: false,
};

Stack.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  padding: PropTypes.oneOf(['none', 'normal', 'small']),
  divider: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Stack;
