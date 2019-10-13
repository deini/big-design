import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, NextLink, Prop, PropTable } from '../components';

const textareaProps: Prop[] = [
  {
    name: 'description',
    types: 'ReactChild',
    description: 'Append a description to the textarea field.',
  },
  {
    name: 'error',
    types: 'ReactChild',
    description: 'Displays an error message for the field.',
  },
  {
    name: 'label',
    types: 'ReactChild',
    description: (
      <>
        Label element for textareas. Component with auto generate <Code>id</Code>'s for the accessibility API.
      </>
    ),
  },
  {
    name: 'rows',
    types: ['1', '2', '3', '4', '5', '6', '7'],
    defaultValue: '3',
    description: (
      <>
        Determines the intial height via HTML's <Code>row</Code> property.
      </>
    ),
  },
  {
    name: 'resize',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Determines if the textarea is resizable vertically.',
  },
];

export const TextareaPropTable: React.FC = () => <PropTable propList={textareaProps} />;

export const TextareaDescriptionPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;p /&gt;</Code> element attributes.
  </Text>
);

export const TextareaErrorPropTable: React.FC = () => (
  <Text>
    See{' '}
    <NextLink href="/Form/FormPage" as="/form#error">
      Forms.Error
    </NextLink>
    .
  </Text>
);

export const TextareaLabelPropTable: React.FC = () => (
  <Text>
    See{' '}
    <NextLink href="/Form/FormPage" as="/form#label">
      Forms.Label
    </NextLink>
    .
  </Text>
);
