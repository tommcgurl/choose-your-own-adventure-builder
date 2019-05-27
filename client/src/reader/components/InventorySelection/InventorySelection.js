import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './InventorySelection.module.css';

export default class InventorySelection extends PureComponent {
  state = {
    selectedOptions: {},
  };

  static propTypes = {
    prompt: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onInventorySelectionComplete: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
  };

  handleClickOption = optionKey => {
    const newSelectedOptions = { ...this.state.selectedOptions };
    const { limit, onInventorySelectionComplete } = this.props;

    if (newSelectedOptions[optionKey]) {
      delete newSelectedOptions[optionKey];
    } else {
      newSelectedOptions[optionKey] = true;
    }

    if (Object.keys(newSelectedOptions).length === limit) {
      onInventorySelectionComplete(newSelectedOptions);
    } else {
      this.setState({
        selectedOptions: newSelectedOptions,
      });
    }
  };

  render() {
    const { prompt, options, limit } = this.props;
    const { selectedOptions } = this.state;
    const currentSelectedOptionCount = Object.keys(selectedOptions).length;
    return (
      <div className={styles.container}>
        <h1>{prompt}</h1>
        {Object.keys(options).map(optionKey => {
          const option = options[optionKey];
          const selected = selectedOptions[optionKey];
          return (
            <div
              className={styles.option}
              onClick={this.handleClickOption.bind(null, optionKey)}
              key={optionKey}
            >
              <h1>
                {optionKey}
                {selected && (
                  <span role="img" aria-label="checkbox">
                    {' '}
                    ✅
                  </span>
                )}
              </h1>
              <p>{option.description}</p>
            </div>
          );
        })}
        <h4>{`${currentSelectedOptionCount}/${limit}`}</h4>
      </div>
    );
  }
}
