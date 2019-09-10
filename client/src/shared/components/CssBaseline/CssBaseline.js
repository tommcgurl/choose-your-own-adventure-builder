import 'normalize.css';
import { useEffect } from 'react';
import theme from '../../constants/theme';
import './CssBaseline.css';
import { userSettingsSelector } from '../../../reader/store/selectors';
import { connect } from 'react-redux';

function kebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const CssBaseline = ({ nightMode }) => {
  useEffect(() => {
    const rootEl = document.getElementById('root');
    let colors = theme.default;
    if (nightMode) {
      colors = { colors, ...theme.night };
    }
    Object.keys(colors).forEach(color => {
      rootEl.style.setProperty(`--color-${kebabCase(color)}`, colors[color]);
    });
  }, [nightMode]);

  return null;
};

const mapStateToProps = state => {
  return {
    nightMode: userSettingsSelector(state).nightMode,
  };
};

export default connect(mapStateToProps)(CssBaseline);
