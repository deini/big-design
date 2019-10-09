import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';

import { StyledTableCell, StyledTableHeader } from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  isCheckbox?: boolean;
  minWidth?: number;
}

export const Cell: React.FC<CellProps> = ({ className, style, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  if (tableSectionContext === 'thead') {
    return <StyledTableHeader stickyHeader={tableContext.stickyHeader} {...props} />;
  }

  return <StyledTableCell {...props} />;
};
