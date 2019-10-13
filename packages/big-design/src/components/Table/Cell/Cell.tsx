import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../types';

import { StyledCustomTableCell, StyledCustomTableHead, StyledDefaultTableCell, StyledDefaultTableHeader } from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement>, Omit<TableCell, 'content'> {
  isCheckbox?: boolean;
}

export const Cell: React.FC<CellProps> = ({ children, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const renderStyledCell = typeof children === 'string' || typeof children === 'number' || props.isCheckbox;

  if (tableSectionContext === 'thead') {
    return renderStyledCell ? (
      <StyledDefaultTableHeader stickyHeader={tableContext.stickyHeader} {...props}>
        {children}
      </StyledDefaultTableHeader>
    ) : (
      <StyledCustomTableHead {...props}>{children}</StyledCustomTableHead>
    );
  }

  return renderStyledCell ? (
    <StyledDefaultTableCell {...props}>{children}</StyledDefaultTableCell>
  ) : (
    <StyledCustomTableCell {...props}>{children}</StyledCustomTableCell>
  );
};
