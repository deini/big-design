import React from 'react';

import { Code, Prop, PropTable } from '../components';

const modalProps: Prop[] = [
  {
    name: 'isOpen',
    types: 'boolean',
    required: true,
    description: 'Determines if the modal/dialog is open.',
  },
  {
    name: 'onClose',
    types: '() => void',
    required: true,
    description: 'Function that will be called on close events.',
  },
  {
    name: 'backdrop',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Determines if the backdrop is shown.',
  },
  {
    name: 'closeOnClickOutside',
    types: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        Controls whether <Code>onClose</Code> is called when clicking outside of the modal.
      </>
    ),
  },
  {
    name: 'closeOnEscKey',
    types: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Controls whether <Code>onClose</Code> is called when pressing the ESC key.
      </>
    ),
  },
  {
    name: 'variant',
    types: ['modal', 'dialog'],
    defaultValue: 'modal',
    description: 'Determines the modal variant.',
  },
];

export const ModalPropTable: React.FC = () => <PropTable propList={modalProps} />;

export const ModalActionsPropTable: React.FC = () => (
  <PropTable
    propList={[
      {
        name: 'withBorder',
        types: 'boolean',
        defaultValue: 'false',
        description: 'Determines if the actions top border is shown.',
      },
    ]}
  />
);

export const ModalHeaderPropTable: React.FC = () => (
  <PropTable
    propList={[
      {
        name: 'withBorder',
        types: 'boolean',
        defaultValue: 'false',
        description: 'Determines if the header bottom border is shown.',
      },
    ]}
  />
);
