import React from 'react';

import { NextLink, Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'backgroundColor',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    description: (
      <>
        Sets the background color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'shadow',
    types: ['floating', 'raised'],
    description: 'Determines the type of shadow to be applied.',
  },
  {
    name: 'border',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of border to be applied.',
  },
  {
    name: 'borderBottom',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of bottom border to be applied.',
  },
  {
    name: 'borderLeft',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of left border to be applied.',
  },
  {
    name: 'borderRight',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of right border to be applied.',
  },
  {
    name: 'borderTop',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of top border to be applied.',
  },
  {
    name: 'borderRadius',
    types: ['normal', 'circle', 'none'],
    description: 'Determines type of border radius to be applied.',
  },
];

export const BoxPropTable: React.FC = () => <PropTable propList={props} />;
