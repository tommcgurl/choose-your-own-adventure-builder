import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Stack from '../Stack/Stack';
import styles from './Menu.module.css';

const Menu = ({ children, className, align, button }) => {
  const [showMenu, setShowMenu] = useState(false);
  let didClickButton = false;
  useEffect(() => {
    let timeout;
    function handleRootClick() {
      // The timeout will ensure this gets executed after other click handlers
      timeout = setTimeout(() => {
        if (didClickButton) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          didClickButton = false;
        } else {
          setShowMenu(false);
        }
      }, 0);
    }

    const root = document.getElementById('root');
    root.addEventListener('click', handleRootClick);
    return () => {
      root.removeEventListener('click', handleRootClick);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });

  function handleButtonClick() {
    didClickButton = true;
    setShowMenu(!showMenu);
  }

  return (
    <span>
      {typeof button === 'string' ? (
        <Button onClick={handleButtonClick}>{button}</Button>
      ) : (
        <span onClick={handleButtonClick}>{button()}</span>
      )}
      {showMenu && (
        <div className={classNames(styles.menuContainer)}>
          <Box
            className={classNames(styles.menu, styles[align])}
            padding="small"
          >
            <Box className={classNames(styles.innerMenu, className)} shadow>
              <Stack>{children}</Stack>
            </Box>
          </Box>
        </div>
      )}
    </span>
  );
};

Menu.defaultProps = {
  align: 'left',
  button: 'Menu',
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  /** Passing a string will use the default Button component. A function that returns JSX can be passed instead. */
  button: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

export default Menu;
