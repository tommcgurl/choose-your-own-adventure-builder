import 'normalize.css';
import { useEffect } from 'react';
import theme from '../../constants/theme';
import './CssBaseline.css';
import getCustomCSSProperties from './getCustomCSSProperties';

const CssBaseline = () => {
  useEffect(() => {
    const rootEl = document.getElementById('root');
    const cssVars = getCustomCSSProperties(theme);
    cssVars.forEach(kvp => {
      rootEl.style.setProperty(kvp.propertyName, kvp.value);
    });
  }, []);

  return null;
};

export default CssBaseline;
