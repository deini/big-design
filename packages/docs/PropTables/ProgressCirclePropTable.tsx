import React from 'react';

import { Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'error',
    types: 'boolean',
    description: 'Sets state to error.',
  },
  {
    name: 'percent',
    types: 'number',
    description: 'Sets the fill length from 0 to 100.',
  },
  {
    name: 'size',
    types: ['xSmall', 'small', 'medium', 'large'],
    defaultValue: 'medium',
    description: 'Size of the component.',
  },
];

export const ProgressCirclePropTable: React.FC = () => <PropTable propList={props} />;
