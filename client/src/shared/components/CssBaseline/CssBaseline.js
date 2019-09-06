import { useEffect } from 'react';
import themeValues from '../../constants/themeValues';
import getCustomCSSProperties from './getCustomCSSProperties';

const CssBaseline = () => {
  useEffect(() => {
    const rootEl = document.getElementById('root');
    const cssVars = getCustomCSSProperties(themeValues);
    cssVars.forEach(kvp => {
      rootEl.style.setProperty(kvp.propertyName, kvp.value);
    });
  }, []);

  return null;
};

export default CssBaseline;
