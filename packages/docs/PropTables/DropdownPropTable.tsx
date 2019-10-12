import React from 'react';

import { Prop, PropTable } from '../components';

const dropdownProps: Prop[] = [
  {
    name: 'maxHeight',
    types: 'number',
    defaultValue: '250',
    description: 'Sets the max-height of the dropdown.',
  },
  {
    name: 'onItemClick',
    types: '(value) => void',
    description: 'Callback called with value of clicked item.',
  },
  {
    name: 'placement',
    types: [
      'auto',
      'auto-end',
      'auto-start',
      'bottom',
      'bottom-end',
      'bottom-start',
      'left',
      'left-end',
      'left-start',
      'right',
      'right-end',
      'right-start',
      'top',
      'top-end',
      'top-start',
    ],
    defaultValue: 'bottom-start',
    description: 'Sets the position of the Dropdown relative to the anchor.',
  },
  {
    name: 'trigger',
    types: 'ReactElement',
    required: true,
    description: 'Element used as anchor.',
  },
];

export const DropdownPropTable: React.FC = () => <PropTable propList={dropdownProps} />;

const dropdownItemProps: Prop[] = [
  {
    name: 'value',
    types: ['string', 'string[]', 'number'],
    description: 'Value of the item',
  },
];

export const DropdownItemPropTable: React.FC = () => <PropTable propList={dropdownItemProps} />;
