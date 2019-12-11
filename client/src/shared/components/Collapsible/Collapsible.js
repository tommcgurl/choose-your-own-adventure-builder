import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosArrowForward } from 'react-icons/io';
import { animated, useTransition } from 'react-spring'
import classNames from 'classnames';
import { Box, Columns } from '../'
import styles from './Collapsible.module.css';

/**
 * A component used to display things in an a collapsible container.
 * Behaves like an accordian when stacked.
 */
const Collapsible = ({ revealed, onToggleReveal, ...props }) => {

  const [isRevealed, setIsRevealed] = useState(revealed);
  // TODO: Get this to animate hight rather than opacity.
  const transitions = useTransition(isRevealed, null, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
    typeof (onToggleReveal) === 'function' && onToggleReveal({
      revealed: !isRevealed
    });
  }

  const {
    headerComponent,
    children,
  } = props;

  const revealButtonClass = classNames(
    styles.revealIcon,
    isRevealed && styles.revealIconRevealed,
  );

  return (
    <Box>
      <Columns>
        <div
          onClick={handleToggleReveal}
          className={styles.revealButtonContainer}>
          <IoIosArrowForward className={revealButtonClass} />
        </div>
        {headerComponent}
      </Columns>
      {
        transitions.map(({ item, key, props }) =>
          item &&
          <animated.div
            key={key}
            style={props}
            className={styles.childContainer} >
            {children}
          </animated.div>
        )
      }
    </Box>
  );

}

Collapsible.propTypes = {
  /**
   * The component that will always be displayed alongside the 
   * reveal button.
   */
  headerComponent: PropTypes.element.isRequired,
  /**
   * The children will be used as the content that can be
   * hidden and shown.
   */
  children: PropTypes.element.isRequired,
  /**
   * Whether or not the content is currently being revealed.
   */
  revealed: PropTypes.bool,
  /**
   * Function called when toggling the reaveal of content.
   * An object of type {revealed: Boolean } 
   * will be passed.
   */
  onToggleReveal: PropTypes.func,
}

export default Collapsible;
