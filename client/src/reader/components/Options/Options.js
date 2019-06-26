import React from 'react';
import { connect } from 'react-redux';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
  toggleFontType,
  toggleNightMode,
} from './store/actions/userSettingsActions';
import { userSettingsSelector } from './store/selectors';
import { SERIF } from './constants/fontTypes';

const Options = ({
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  toggleNightMode,
  toggleFontType,
  userSettings,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <button onClick={toggleNightMode}>
        {userSettings.nightMode ? 'Turn Off Night Mode' : 'Turn On Night Mode'}
      </button>
      <button onClick={increaseFontSize}>Text Size +</button>
      <button onClick={decreaseFontSize}>Text Size -</button>
      <button onClick={resetFontSize}>Reset Text Size</button>
      <button onClick={toggleFontType}>
        {userSettings.fontType === SERIF
          ? 'Switch to Sans-Serif'
          : 'Switch to Serif'}
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userSettings: userSettingsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNightMode: () => {
      dispatch(toggleNightMode());
    },
    increaseFontSize: () => {
      dispatch(increaseFontSize());
    },
    decreaseFontSize: () => {
      dispatch(decreaseFontSize());
    },
    resetFontSize: () => {
      dispatch(resetFontSize());
    },
    toggleFontType: () => {
      dispatch(toggleFontType());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
