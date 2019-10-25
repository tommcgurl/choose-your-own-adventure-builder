import React from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';
import { MdFormatSize, MdTextFields, MdTitle } from 'react-icons/md';
import { WiSolarEclipse } from 'react-icons/wi';
import { connect } from 'react-redux';
import { Button, BUTTON_VARIANTS } from '../../../shared/components';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
  toggleFontType,
  toggleNightMode,
} from '../../../shared/store/actions/userSettingsActions';
import { userSettingsSelector } from '../../../shared/store/selectors';

const Options = ({
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  toggleNightMode,
  toggleFontType,
  userSettings,
}) => {
  const iconStyle = { width: '100%', height: '100%' };
  return (
    <React.Fragment>
      <Button variant={BUTTON_VARIANTS.ICON} onClick={toggleNightMode}>
        <WiSolarEclipse style={iconStyle} />
      </Button>
      <Button variant={BUTTON_VARIANTS.ICON} onClick={increaseFontSize}>
        <MdFormatSize style={iconStyle} />
      </Button>
      <Button variant={BUTTON_VARIANTS.ICON} onClick={decreaseFontSize}>
        <MdTextFields style={iconStyle} />
      </Button>
      <Button variant={BUTTON_VARIANTS.ICON} onClick={resetFontSize}>
        <MdTitle style={iconStyle} />
      </Button>
      <Button variant={BUTTON_VARIANTS.ICON} onClick={toggleFontType}>
        {/* TODO: Find a good icon for this */}
        <FaHandMiddleFinger style={iconStyle} />
      </Button>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userSettings: userSettingsSelector(state),
  };
};

export default connect(
  mapStateToProps,
  {
    toggleNightMode,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleFontType,
  }
)(Options);
