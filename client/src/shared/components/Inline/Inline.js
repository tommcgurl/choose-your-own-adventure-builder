import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children, forwardRef } from 'react';
import { getMobileAndDesktopValues } from '../../helpers/layoutHelpers';
import styles from './Inline.module.css';

const Inline = forwardRef(
  ({ children, align, className, padding, ...rest }, ref) => {
    const [mobilePadding, desktopPadding] = getMobileAndDesktopValues(padding);
    return (
      <div
        className={classNames(
          styles.container,
          styles[align],
          styles[`${mobilePadding}Container`],
          styles[`desktop-${desktopPadding}Container`],
          className
        )}
        {...rest}
        ref={ref}
      >
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            className={classNames(
              styles[`${mobilePadding}Child`],
              styles[`desktop-${desktopPadding}Child`]
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);

Inline.defaultProps = {
  align: 'left',
  padding: 'normal',
};

Inline.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  padding: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'normal']),
    PropTypes.arrayOf(PropTypes.oneOf(['none', 'small', 'normal'])),
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Inline;
