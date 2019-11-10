import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Inline.module.css';

const Inline = ({ children, align, className, ...rest }) => {
  return (
    <div
      className={classNames(styles.container, styles[align], className)}
      {...rest}
    >
      {children}
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
