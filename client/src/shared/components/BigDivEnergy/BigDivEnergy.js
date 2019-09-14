import classNames from 'classnames';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userSettingsSelector } from '../../store/selectors';
import styles from './BigDivEnergy.module.css';
import nightColors from './nightColors.module.css';

/**
 * Wrapping components with BigDivEnergy will apply all standard styling
 * as well as provide custom properties for theming.
 */
const BigDivEnergy = ({ nightMode, children }) => {
  const className = classNames(styles.container, {
    [nightColors.workinOnTheNightMode]: nightMode,
  });
  return (
    <div id="big-div-energy" className={className}>
      {children}
    </div>
  );
};

BigDivEnergy.propTypes = {
  nightMode: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

BigDivEnergy.defaultProps = {
  nightMode: false,
};

const mapStateToProps = state => {
  return {
    nightMode: userSettingsSelector(state).nightMode,
  };
};

export default connect(mapStateToProps)(BigDivEnergy);
