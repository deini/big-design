import React from 'react';

import { NextLink, PropTable } from '../components';

const props = [
  {
    name: 'color',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    description: (
      <>
        Sets the icon color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'size',
    types: [
      <NextLink href="/Spacing/SpacingPage" as="/spacing">
        Spacing
      </NextLink>,
      'number',
    ],
    description: (
      <>
        Determines the size of the icon. Accepts a{' '}
        <NextLink href="/Spacing/SpacingPage" as="/spacing">
          Spacing
        </NextLink>{' '}
        value or a number of px.
      </>
    ),
  },
];

export const IconPropTable: React.FC = () => <PropTable propList={props} />;
