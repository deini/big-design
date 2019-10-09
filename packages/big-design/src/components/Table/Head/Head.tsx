import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableHead } from './styled';

export type HeadProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

export const Head: React.FC<HeadProps> = ({ className, style, ...props }) => (
  <TableSectionContext.Provider value="thead">
    <StyledTableHead {...props} />
  </TableSectionContext.Provider>
);
