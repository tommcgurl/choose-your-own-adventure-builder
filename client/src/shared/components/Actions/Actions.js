import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Inline from '../Inline/Inline';
import Stack from '../Stack/Stack';
import styles from './Actions.module.css';

const Actions = ({ children, ...rest }) => {
  const inlineRef = useRef();
  const stackRef = useRef();
  const [stackItems, setStackItems] = useState(false);
  const [widthOfChildren, setWidthOfChildren] = useState(0);

  useEffect(() => {
    setWidthOfChildren(
      Array.from(inlineRef.current.children).reduce(
        (acc, cur, i) => acc + cur.offsetWidth + 12,
        0
      )
    );
  }, []);

  useEffect(() => {
    function conditionallyStackItems() {
      if (
        inlineRef.current &&
        widthOfChildren > inlineRef.current.offsetWidth &&
        !stackItems
      ) {
        setStackItems(true);
      }

      if (
        stackRef.current &&
        widthOfChildren <= stackRef.current.offsetWidth &&
        stackItems
      ) {
        setStackItems(false);
      }
    }

    conditionallyStackItems();

    window.addEventListener('resize', conditionallyStackItems);

    return () => window.removeEventListener('resize', conditionallyStackItems);
  });

  return stackItems ? (
    <Stack ref={stackRef} {...rest}>
      {Children.map(children, (child, index) => {
        return child
          ? cloneElement(child, {
              index,
              className: styles.stackedItem,
            })
          : null;
      })}
    </Stack>
  ) : (
    <Inline {...rest} ref={inlineRef}>
      {children}
    </Inline>
  );
};

Actions.defaultProps = {
  align: 'left',
};

Actions.propTypes = {
  alight: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node.isRequired,
};

export default Actions;
