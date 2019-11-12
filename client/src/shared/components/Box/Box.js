import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createElement, forwardRef } from 'react';
import { getMobileAndDesktopValues } from '../../helpers/layoutHelpers';
import styles from './Box.module.css';

const Box = forwardRef(
  ({ component, padding, className, shadow, ...rest }, ref) => {
    const [mobilePadding, desktopPadding] = getMobileAndDesktopValues(padding);

    return createElement(component, {
      className: classNames(
        styles.container,
        styles[mobilePadding],
        styles[`desktop-${desktopPadding}`],
        {
          [styles.shadow]: shadow,
        },
        className
      ),
      ...rest,
      ref,
    });
  }
);

Box.defaultProps = {
  component: 'div',
  padding: 'normal',
  shadow: false,
};

Box.propTypes = {
  component: PropTypes.string.isRequired,
  padding: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'normal']),
    PropTypes.arrayOf(PropTypes.oneOf(['none', 'small', 'normal'])),
  ]).isRequired,
  shadow: PropTypes.bool.isRequired,
};

export default Box;
