import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Dropdown from './Dropdown';

const mockOptions = [
  'Gorden Freeman',
  'Alyx Vance',
  'Dr. Eli Vance',
  'Barney Calhoun',
  'Dr. Isaac Kliener',
  'G-Man',
]
storiesOf('Components|Dropdown', module)
  .addParameters({ component: Dropdown })
  .add('default', () => (
    <Dropdown>
      {
        mockOptions.map(optionVal => (
          <option
            val={optionVal}
            key={optionVal}>
            {optionVal}
          </option>
        ))
      }
    </Dropdown>
  ))
  .add('with label', () => (
    <Dropdown
      label="Select Character"
      id="character-select" >
      {
        mockOptions.map(optionVal => (
          <option
            val={optionVal}
            key={optionVal}>
            {optionVal}
          </option>
        ))
      }
    </Dropdown>
  ))
  .add('with default value', () => (
    <Dropdown
      label="Select Character"
      id="character-select"
      value={mockOptions[5]}
    >
      {
        mockOptions.map(optionVal => (
          <option
            val={optionVal}
            key={optionVal}>
            {optionVal}
          </option>
        ))
      }
    </Dropdown>
  ))
  .add('with onChange', () => (
    <Dropdown
      label="Select Character"
      id="character-select"
      onChange={action(`Selected an option`)}
      value={mockOptions[5]}>
      {
        mockOptions.map(optionVal => (
          <option
            val={optionVal}
            key={optionVal}>
            {optionVal}
          </option>
        ))
      }
    </Dropdown>
  ))