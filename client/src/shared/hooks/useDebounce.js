import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';

export default function(func, wait, cancelOnUnmount = false) {
  const refContainer = useRef(debounce(func, wait));

  useEffect(() => {
    if (cancelOnUnmount) {
      return () => {
        refContainer.current.cancel();
      };
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refContainer.current.flush();
    };
  }, [cancelOnUnmount]);

  return refContainer.current;
}
