import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableBody } from './styled';

export interface BodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const Body: React.FC<BodyProps> = ({ className, style, ...props }) => (
  <TableSectionContext.Provider value="tbody">
    <StyledTableBody {...props} />
  </TableSectionContext.Provider>
);
