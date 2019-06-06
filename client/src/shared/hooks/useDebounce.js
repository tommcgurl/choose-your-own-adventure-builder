import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

export default function(func, wait, cancelOnUnmount = false) {
  const refContainer = useRef(debounce(func, wait));

  useEffect(() => {
    if (cancelOnUnmount) {
      return () => {
        refContainer.current.cancel();
      };
    }

    return () => {
      refContainer.current.flush();
    };
  }, []);

  return refContainer.current;
}
